from dj_rest_auth.serializers import UserDetailsSerializer, TokenSerializer, JWTSerializer, JWTSerializerWithExpiration
from rest_framework import serializers


class CurrentUserSerializer(UserDetailsSerializer):
    profile_id = serializers.ReadOnlyField(source='profile.id')
    profile_image = serializers.ReadOnlyField(source='profile.image.url')

    class Meta(UserDetailsSerializer.Meta):
        fields = UserDetailsSerializer.Meta.fields + (
            'profile_id', 'profile_image'
        )

class CustomTokenSerializer(TokenSerializer):
    user = CurrentUserSerializer(many=False, read_only=True)

    class Meta(TokenSerializer.Meta):
        fields = TokenSerializer.Meta.fields + (
            'user',
        )


# class CustomJWTSerializer(JWTSerializer):
#     user = CurrentUserSerializer(many=False, read_only=True)

#     class Meta(JWTSerializer.Meta):
#         fields = JWTSerializer.Meta.fields + (
#             'user',
#         )

# class CustomJWTSerializerWithExpiration(JWTSerializerWithExpiration):
#     user = CurrentUserSerializer(many=False, read_only=True)

#     class Meta(JWTSerializerWithExpiration.Meta):
#         fields = JWTSerializerWithExpiration.Meta.fields + (
#             'user',
#         )