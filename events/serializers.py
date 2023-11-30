from rest_framework import serializers
from datetime import datetime
import pytz
from .models import Event, EventImage, Image, EventMainImage


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
    images = EventImageSerializer(many=True)
    # starts_at = serializers.DateTimeField(format="%H:%M:%S on %d/%m/%Y - %Z")
    # ends_at = serializers.DateTimeField(format="%H:%M:%S on %d/%m/%Y - %Z")

    def get_is_creator(self, obj):
        request = self.context["request"]
        return request.user == obj.created_by

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
        ]
        depth = 3
        optional_fields = ["created_by"]


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
