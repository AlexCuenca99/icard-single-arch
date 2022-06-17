from django.db import models
from django.contrib.auth.models import BaseUserManager


# Manager para la creación de usuarios (super y admins)
class UserManager(BaseUserManager, models.Manager):
    # def _create_user(self, username, email, password, is_staff, is_superuser, **extrafields):
    #     user = self.model(
    #         username = username,
    #         email = email,
    #         is_staff = is_staff,
    #         is_superuser = is_superuser,
    #         **extrafields
    #     )

    #     user.set_password(password)
    #     user.save()

    #     return user

    # def create_user(self, username, email, password=None, **extrafields):
    #     return self._create_user(username, email, password, False, False, **extrafields)

    # def create_superuser(self, username, email, password=None, **extra_fields):
    #     return self._create_user(username, email, password, True, True, **extra_fields)

    def create_user(self, username, email, password=None):
        if username is None:
            raise TypeError("Users should have a username")
        if email is None:
            raise TypeError("Users should have a Email")

        # user = self.model(username=username, email=self.normalize_email(email))
        user = self.model(username=username, email=email)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, username, email, password=None):
        if password is None:
            raise TypeError("Password should not be none")

        user = self.create_user(username, email, password)
        user.is_superuser = True
        user.is_staff = True
        user.save()
        return user
