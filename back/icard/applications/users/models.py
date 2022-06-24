# Imports de Django
from django.db import models
from model_utils.models import TimeStampedModel
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin

# Imports de managers
from .managers import UserManager


class User(AbstractBaseUser, PermissionsMixin, TimeStampedModel):
    username = models.CharField("Nombre de Usuario", max_length=15, unique=True)
    email = models.EmailField("Correo Electrónico", max_length=30, unique=True)
    first_name = models.CharField("Nombres", max_length=25, blank=True)
    last_name = models.CharField("Apellidos", max_length=25, blank=True)
    is_staff = models.BooleanField("Administrador", default=False)
    is_active = models.BooleanField("Activo", default=True)

    objects = UserManager()

    class Meta:
        verbose_name = "Usuario"
        verbose_name_plural = "Usuarios"

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    # Crear nombres cortos
    def get_short_name(self):
        return self.username

    # Crear nombre completo
    def get_full_name(self):
        return self.first_name + " " + self.last_name

    def __str__(self):
        return str(self.username) + " - " + str(self.email)
