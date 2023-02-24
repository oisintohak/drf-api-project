from rest_framework import serializers
from .models import Event


class EventSerializer(serializers.ModelSerializer):
    is_creator = serializers.SerializerMethodField()

    def get_is_creator(self, obj):
        request = self.context['request']
        return request.user == obj.created_by

    class Meta:
        model = Event
        fields = [
            'id', 'created_by', 'title', 'starts_at',
            'ends_at', 'location', 'created_at', 'updated_at', 'is_creator'
        ]
