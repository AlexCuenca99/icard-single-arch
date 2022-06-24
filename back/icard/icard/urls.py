"""icard URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
# Imports de Django
from django.urls import path, include
from django.conf import settings
from django.contrib import admin
from django.conf.urls.static import static

# Imports de Apps de terceros
from drf_yasg.views import get_schema_view
from rest_framework import permissions
from drf_yasg import openapi


# Configuración DRF-YASG
schema_view = get_schema_view(
    openapi.Info(
        title="iCard API",
        default_version="v2",
        description="Documentación de la API de iCard",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="alex-patricio1999@hotmail.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    # Sitio administrador
    path("admin/", admin.site.urls),
    # Autenticación Djoser
    path("auth/", include("djoser.urls")),
    path("auth/", include("djoser.urls.jwt")),
    # Urls de DRF-Yasg
    path(
        "docs/",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="schema-swagger-ui",
    ),
    # Endpoint para descargar .json e importar en un procesador de API's
    path(
        "api/api.json",
        schema_view.without_ui(cache_timeout=0),
        name="schema-swagger-ui",
    ),
    path("redocs/", schema_view.with_ui("redoc", cache_timeout=0), name="schema-redoc"),
    # Endpoints de módulo de autenticación de usuarios
    path("autenticacion/", include("applications.users.urls")),
    # Endpoints de módulo de usuarios
    path("", include("applications.users.routers")),
    # Endpoints de módulo de categorías
    path("", include("applications.categories.routers")),
    # Endpoints de módulo de alimentos
    path("", include("applications.foods.routers")),
    path("", include("applications.foods.urls")),
    # Endpoints de módulo de alimentos
    path("", include("applications.tables.routers")),
    # Endpoints de módulo de órdenes
    path("", include("applications.orders.routers")),
    # Endpoints de módulo de pagos
    path("", include("applications.payments.routers")),
    path("", include("applications.payments.urls")),
    # Endpoints de módulo de negocio
    path("", include("applications.business.routers")),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
