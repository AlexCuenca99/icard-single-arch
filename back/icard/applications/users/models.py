# Imports de Django
from django.db import models
from model_utils.models import TimeStampedModel
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin

# Imports de DRF
from rest_framework_simplejwt.tokens import RefreshToken

# Imports de Managers
from .managers import UserManager


class User(TimeStampedModel, AbstractBaseUser, PermissionsMixin):
    username = models.CharField("Nombre de Usuario", max_length=15, unique=True)
    email = models.EmailField("Correo Electrónico", max_length=30, unique=True)
    first_name = models.CharField("Nombres", max_length=25, blank=True)
    last_name = models.CharField("Apellidos", max_length=25, blank=True)

    is_verified = models.BooleanField("Verificado", default=False)
    is_staff = models.BooleanField("Administrador", default=False)
    is_active = models.BooleanField("Activo", default=True)

    class Meta:
        verbose_name = "Usuario"
        verbose_name_plural = "Usuarios"

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = [
        "username",
    ]

    objects = UserManager()
    user_objects = UserManager()

    # Crear nombres cortos
    def get_short_name(self):
        return self.username

    # Crear nombre completo
    def get_full_name(self):
        return self.first_name + " " + self.last_name

    def tokens(self):
        refresh_token = RefreshToken.for_user(self)
        return {
            "refresh": str(refresh_token),
            "access": str(refresh_token.access_token),
        }

    def __str__(self):
        return str(self.username) + " - " + str(self.email)
