from rest_framework import serializers
from django.db import IntegrityError
from datetime import datetime
import pytz
from .models import *


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ["image"]


class EventImageSerializer(serializers.ModelSerializer):
    image = ImageSerializer()

    class Meta:
        model = EventImage
        fields = ["image", "title"]


class DynamicFieldsModelSerializer(serializers.ModelSerializer):
    """
    A ModelSerializer that takes an additional `fields` argument that
    controls which fields should be displayed. Taken from:
    https://www.django-rest-framework.org/api-guide/serializers/#dynamically-modifying-fields
    """

    def __init__(self, *args, **kwargs):
        # Don't pass the 'fields' arg up to the superclass
        fields = kwargs.pop("fields", None)
        exclude = kwargs.pop("exclude", None)

        # Instantiate the superclass normally
        super().__init__(*args, **kwargs)

        if exclude is not None:
            # Drop any fields that are not specified in the `fields` argument.
            excluded = set(exclude)
            for field_name in excluded:
                self.fields.pop(field_name)

        if fields is not None:
            # Drop any fields that are not specified in the `fields` argument.
            allowed = set(fields)
            existing = set(self.fields)
            for field_name in existing - allowed:
                self.fields.pop(field_name)


class EventSerializer(DynamicFieldsModelSerializer):
    is_creator = serializers.SerializerMethodField()
    profile_id = serializers.ReadOnlyField(source="created_by.profile.id")
    profile_image = serializers.ReadOnlyField(source="created_by.profile.image.url")
    creator_username = serializers.ReadOnlyField(source="created_by.username")
    is_over = serializers.BooleanField(read_only=True)
    starts_at = serializers.DateTimeField()
    ends_at = serializers.DateTimeField()
    favourite_id = serializers.SerializerMethodField()
    attendee_id = serializers.SerializerMethodField()
    # images = EventImageSerializer(many=True, required=False)
    # starts_at = serializers.DateTimeField(format="%H:%M:%S on %d/%m/%Y - %Z")
    # ends_at = serializers.DateTimeField(format="%H:%M:%S on %d/%m/%Y - %Z")
    
    class Meta:
        model = Event
        fields = [
            "id",
            "title",
            "starts_at",
            "ends_at",
            "lat",
            "long",
            "address",
            "place_id",
            "created_at",
            "updated_at",
            "is_creator",
            "profile_id",
            "profile_image",
            "creator_username",
            "is_over",
            "images",
            "main_image",
            "favourite_id",
            "attendee_id"
        ]
        depth = 3
        optional_fields = [
            "created_by",
            "main_image",
        ]

    def get_is_creator(self, obj):
        request = self.context["request"]
        return request.user == obj.created_by

    def get_favourite_id(self, obj):
        request = self.context["request"]
        if request.user.is_authenticated:
            favourite = obj.favourites.filter(user=request.user, event=obj).first()
            return favourite.id if favourite else None
        return None

    def get_attendee_id(self, obj):
        request = self.context["request"]
        if request.user.is_authenticated:
            favourite = obj.attendees.filter(user=request.user, event=obj).first()
            return favourite.id if favourite else None
        return None


    # def create(self, validated_data):
    #     print('')
    #     print('')
    #     print(self.initial_data)
    #     print('')
    #     print('')
    #     print(validated_data)
    #     main_image_data = validated_data.pop("main_image")
    #     main_image = EventMainImage.objects.create(image=main_image_data)
    #     event = Event.objects.create(main_image=main_image, **validated_data)
    #     return event


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image


class EventFavouriteSerializer(serializers.ModelSerializer):

    class Meta:
        model = EventFavourite
        fields = ["id", "created_at", "event"]
        optional_fields = ["user"]

    def create(self, validated_data):
        try:
            return super().create(validated_data)
        except IntegrityError:
            raise serializers.ValidationError({"detail": "duplicate favourite"})


class EventAttendeeSerializer(serializers.ModelSerializer):
    user_id = serializers.ReadOnlyField(source="user.id")
    profile_image = serializers.ReadOnlyField(source='user.profile.image.url')
    username = serializers.ReadOnlyField(source="user.username")
    bio = serializers.ReadOnlyField(source="user.profile.bio")

    class Meta:
        model = EventAttendee
        fields = ["id", "created_at", "event", "profile_image", "user_id", "username", "bio"]
        optional_fields = ["user"]

    def create(self, validated_data):
        try:
            return super().create(validated_data)
        except IntegrityError:
            raise serializers.ValidationError({"detail": "duplicate favourite"})
