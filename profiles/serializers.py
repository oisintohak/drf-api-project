from rest_framework import serializers
from .models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    is_user = serializers.SerializerMethodField()

    def get_is_user(self, obj):
        request = self.context['request']
        return request.user == obj.user

    class Meta:
        model = Profile
        fields = [
            'id', 'user', 'created_at', 'updated_at', 'first_name', 'last_name', 'image', 'is_user'
        ]
