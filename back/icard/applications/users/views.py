from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.contrib.sites.shortcuts import get_current_site
from django.utils.encoding import (
    smart_str,
    force_str,
    smart_bytes,
    DjangoUnicodeDecodeError,
)
from django.conf import settings
from django.urls import reverse

# Imports de DRF
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import generics, status, views
from rest_framework.response import Response

# Imports de JWT
import jwt

# Imports de DRF-yasg
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

# Imports de Serializadores
from .serializers import (
    RequestPasswordResetEmailSerializer,
    EmailVerificationSerializer,
    SetNewPasswordSerializer,
    JWTLogoutSerializer,
    RegisterSerializer,
    JWTLoginSerializer,
    UserSerializer,
)

# Imports de Renderizadores
from .renderers import (
    UserRenderer,
)

# Imports de modelos
from .models import User

# Imports de funciones Utils
from .utils import Util


# Vista para que cuando se cree un usuario se envie un correo con el token
class RegisterAPIView(generics.GenericAPIView):

    serializer_class = RegisterSerializer
    renderer_classes = (UserRenderer,)
    permission_classes = [AllowAny]

    def post(self, request):
        user = request.data
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        user_data = serializer.data
        user = User.user_objects.get(email=user_data["email"])

        # Generación de tokens
        token = RefreshToken.for_user(user).access_token
        current_site = get_current_site(request).domain
        relative_link = reverse("users_app:verificar-email")
        absolute_url = "http://" + current_site + relative_link + "?token=" + str(token)
        # Construcción del correo
        email_body = (
            "¡Bienvenido "
            + user.username
            + "! \nPor favor, use el siguiente link para poder verificar su cuenta \n"
            + absolute_url
        )
        data = {
            "email_body": email_body,
            "email_to": user.email,
            "email_subject": "Verificar su correo electrónico",
        }
        Util.send_email(data)
        return Response(user_data, status=status.HTTP_201_CREATED)


# Vista para aceptar un token y verificar la cuenta de ser correcto
class VerifyEmailAPIView(views.APIView):

    serializer_class = EmailVerificationSerializer
    permission_classes = [AllowAny]

    token_param_config = openapi.Parameter(
        "token",
        in_=openapi.IN_QUERY,
        description="Token de usuario",
        type=openapi.TYPE_STRING,
    )

    # Decorador para agregar un campo de forma manual en una petición GET
    @swagger_auto_schema(manual_parameters=[token_param_config])
    def get(self, request):
        token = request.GET.get("token")
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])

            user = User.user_objects.get(id=payload["user_id"])

            if not user.is_verified:
                user.is_verified = True
                user.save()

            return Response(
                {"errors": "El usuario ha sido activado correctamente"},
                status=status.HTTP_200_OK,
            )

        except jwt.ExpiredSignatureError as identifier:
            return Response(
                {"errors": "El link de activación ha expirado"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        except jwt.exceptions.DecodeError as identifier:
            return Response(
                {"errors": "El token de usuario ha expirado"},
                status=status.HTTP_400_BAD_REQUEST,
            )


# Vista para que un usuario pueda iniciar sesión
class JWTLoginAPIView(generics.GenericAPIView):

    serializer_class = JWTLoginSerializer
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        return Response(serializer.data, status=status.HTTP_200_OK)


# Vista para que un usuario pueda recuperar su contraseña
class RequestPasswordResetEmailApiView(generics.GenericAPIView):
    serializer_class = RequestPasswordResetEmailSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)

        email = request.data["email"]

        # Si es que se halla un usuario con el correo provisto
        if User.user_objects.filter(email=email).exists():
            user = User.user_objects.get(email=email)
            uidb64 = urlsafe_base64_encode(smart_bytes(user.id))
            token = PasswordResetTokenGenerator().make_token(user)

            # Enviar el correo de recuperación
            current_site = get_current_site(request=request).domain
            relative_link = reverse(
                "users_app:confirmar-reestablecer-contrasena",
                kwargs={"uidb64": uidb64, "token": token},
            )
            absolute_url = "http://" + current_site + relative_link

            # Construcción del correo
            email_body = (
                "Reestablezca su contraseña,"
                + "\n!Por favor, use el siguiente link para poder reestablecer su contraseña.\n"
                + absolute_url
            )
            data = {
                "email_body": email_body,
                "email_to": user.email,
                "email_subject": "Restablezca su contraseña",
            }
            Util.send_email(data)

        return Response(
            {
                "success": "Hemos enviado un link a la dirección de correo provista para que pueda reestablecer su contraseña."
            },
            status=status.HTTP_200_OK,
        )


#
class PasswordTokenCheckAPIView(generics.GenericAPIView):
    serializer_class = SetNewPasswordSerializer

    def get(self, request, uidb64, token):
        try:
            id = smart_str(urlsafe_base64_decode(uidb64))
            user = User.user_objects.get(id=id)

            if not PasswordResetTokenGenerator().check_token(user, token):
                return Response(
                    {"errors": "El token no es válido, por favor solicite uno nuevo"},
                    status=status.HTTP_401_UNAUTHORIZED,
                )

            return Response(
                {
                    "success": True,
                    "message": "Las credenciales ingresadas son válidas",
                    "uidb64": uidb64,
                    "token": token,
                },
                status=status.HTTP_200_OK,
            )
        except DjangoUnicodeDecodeError as identifier:
            return Response(
                {"errors": "El token no es válido, por favor solicite uno nuevo"},
                status=status.HTTP_401_UNAUTHORIZED,
            )


# Vista para establecer una nueva contraseña luego de enviar a reestablecer
class SetNewPasswordAPIView(generics.GenericAPIView):
    serializer_class = SetNewPasswordSerializer

    def patch(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)

        return Response(
            {
                "success": True,
                "messages": "Su contraseña se ha reestablecido correctamente",
            },
            status=status.HTTP_200_OK,
        )


# Vista para cerrar sesión de un usuario
class JWTLogoutApiView(generics.GenericAPIView):
    serializer_class = JWTLogoutSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(status=status.HTTP_204_NO_CONTENT)


# Vista para que un usuario autenticado pueda obtener sus datos
class UserAuthView(views.APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(
            {
                "success": True,
                "message": "Datos recuperados satisfactoriamente",
                "data": serializer.data,
            },
            status=status.HTTP_200_OK,
        )
