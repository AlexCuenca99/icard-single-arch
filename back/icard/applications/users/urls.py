from django.urls import path
from .views import *

from rest_framework_simplejwt.views import TokenObtainPairView

app_name = "users_app"


urlpatterns = [
    path("login/", TokenObtainPairView.as_view(), name="login"),
    path("mis-datos/", UserAPIView.as_view(), name="mis-datos"),
]
