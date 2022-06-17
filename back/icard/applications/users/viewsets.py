from django.contrib.auth.hashers import make_password

from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser, AllowAny

from .models import User
from .serializers import UserSerializer

# CRUD de usuarios
class UserAPIViewSet(viewsets.ModelViewSet):

    permission_classes = [AllowAny]
    serializer_class = UserSerializer
    queryset = User.objects.all()

    # Encriptar contraseña del usuario
    def create(self, request, *args, **kwargs):
        request.data["password"] = make_password(request.data["password"])
        return super().create(request, *args, **kwargs)

    def partial_update(self, request, *args, **kwargs):
        password = request.data["password"]

        if password:
            request.data["password"] = make_password(password)
        else:
            request.data["password"] = request.user.password

        return super().update(request, *args, **kwargs)
