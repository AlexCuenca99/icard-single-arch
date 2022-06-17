# Imports de Django
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import (
    smart_str,
    force_str,
    smart_bytes,
    DjangoUnicodeDecodeError,
)
from django.contrib import auth
from django.contrib.auth import get_user_model

User = get_user_model()

# Imports de DRF
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from rest_framework import serializers

# Imports de Djoser
from djoser.serializers import UserCreateSerializer

# Imports de modelos
from .models import User


# Serializador para registrar un nuevo usuario
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=20, min_length=6, write_only=True)

    class Meta:
        model = User
        fields = [
            "email",
            "username",
            "password",
        ]

    def validate(self, attrs):
        email = attrs.get("email", "")
        username = attrs.get("username", "")

        if not username.isalnum():
            raise serializers.ValidationError(
                "El nombre de usuario solo debe contener caracteres alfanuméricos"
            )

        return attrs

    def create(self, validated_data):
        return User.user_objects.create_user(**validated_data)


# Serializador para verificar un correo electrónico mediante un token
class EmailVerificationSerializer(serializers.ModelSerializer):
    token = serializers.CharField(max_length=555)

    class Meta:
        model = User
        fields = ["token"]


class JWTLoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=30, min_length=5)
    password = serializers.CharField(max_length=20, min_length=6, write_only=True)
    username = serializers.CharField(max_length=25, min_length=2, read_only=True)
    tokens = serializers.SerializerMethodField()

    def get_tokens(self, obj):
        user = User.user_objects.get(email=obj["email"])

        return {
            "access": user.tokens()["access"],
            "refresh": user.tokens()["refresh"],
        }

    class Meta:
        model = User
        fields = ["email", "password", "username", "tokens"]

    # Validación de los datos del serializador
    def validate(self, attrs):
        email = attrs.get("email", None)
        password = attrs.get("password", None)

        user = auth.authenticate(attrs, email=email, password=password)

        if not user:
            raise AuthenticationFailed("Credenciales no válidas. Inténtelo de nuevo.")

        if not user.is_active:
            raise AuthenticationFailed(
                "Credenciales no activadas. La cuenta no está activa."
            )

        if not user.is_verified:
            raise AuthenticationFailed(
                "Credenciales no verificadas. Active su cuenta antes."
            )

        return {"email": user.email, "username": user.username, "tokens": user.tokens}

        return super().validate(attrs)


# Serializador para recuperar contraseña por correo electrónico
class RequestPasswordResetEmailSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=30, min_length=5)

    class Meta:
        model = User
        fields = ["email"]


# Serializador para establecer una nueva contraseña luego de enviar a reestablecer
class SetNewPasswordSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=20, min_length=6, write_only=True)
    token = serializers.CharField(min_length=1, write_only=True)
    uidb64 = serializers.CharField(min_length=1, write_only=True)

    class Meta:
        model = User
        fields = ["password", "token", "uidb64"]

    def validate(self, attrs):
        try:
            password = attrs.get("password", None)
            token = attrs.get("token", None)
            uidb64 = attrs.get("uidb64", None)

            id = force_str(urlsafe_base64_decode(uidb64))
            user = User.user_objects.get(id=id)

            if not PasswordResetTokenGenerator().check_token(user, token):
                raise AuthenticationFailed(
                    "El link para reestablecer la contraseña no es válido", 401
                )

            user.set_password(password)
            user.save()

            return user
        except Exception as e:
            raise AuthenticationFailed(
                "El link para reestablecer la contraseña no es válido", 401
            )
        return super().validate(attrs)


#
class JWTLogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField()

    default_error_messages = {"bad_token": "El token ha expirado o no es válido"}

    def validate(self, attrs):
        self.token = attrs["refresh"]

        return attrs

    def save(self, **kwargs):
        try:
            RefreshToken(self.token).blacklist()
        except TokenError:
            self.fail("bad_token")


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


# AUTENTICACIÓN CON DJOSER
class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ("id", "email", "username", "password")
