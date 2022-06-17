from os import name
from django.urls import path
from .views import *

# from rest_framework_simplejwt.views import TokenRefreshView

app_name = "users_app"


urlpatterns = [
    # path("registro/", RegisterAPIView.as_view(), name="registro"),
    # path("verificar-email/", VerifyEmailAPIView.as_view(), name="verificar-email"),
    path("login/", JWTLoginAPIView.as_view(), name="login"),
    path("logout/", JWTLogoutApiView.as_view(), name="logout"),
    # path("refrescar-token", TokenRefreshView.as_view(), name="refrescar-token"),
    # path(
    #     "solicitar-reestablecer-contrasena/",
    #     RequestPasswordResetEmailApiView.as_view(),
    #     name="solicitar-reestablecer-contrasena",
    # ),
    # path(
    #     "reestablecer-contrasena/<uidb64>/<token>/",
    #     PasswordTokenCheckAPIView.as_view(),
    #     name="confirmar-reestablecer-contrasena",
    # ),
    # path(
    #     "completado-reestablecer-contrasena",
    #     SetNewPasswordAPIView.as_view(),
    #     name="completado-reestablecer-contrasena",
    # ),
    path("mis-datos/", UserAuthView.as_view(), name="mis-datos"),
]
