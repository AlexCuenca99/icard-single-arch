# Imports de Django
from django.contrib.auth import get_user_model

User = get_user_model()

# Imports de DRF
from rest_framework import serializers

# Imports de Djoser
from djoser.serializers import UserCreateSerializer as UserCreateSerializerDjoser

# Imports de modelos
from .models import User


# Serializador para obtener los datos de los usuarios
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
            "is_active",
            "is_staff",
            "password",
        ]


# Override de la clase UserCreateSerializer
class UserCreateSerializer(UserCreateSerializerDjoser):
    class Meta(UserCreateSerializerDjoser.Meta):
        model = User
        fields = ("id", "email", "password")
