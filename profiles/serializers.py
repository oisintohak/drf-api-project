from rest_framework import serializers
from .models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    is_user = serializers.SerializerMethodField()
    username = serializers.ReadOnlyField(source='user.username')

    def get_is_user(self, obj):
        request = self.context['request']
        return request.user == obj.user

    class Meta:
        model = Profile
        fields = [
            'id', 'user', 'created_at', 'updated_at', 'bio', 'image', 'is_user', 'username'
        ]
