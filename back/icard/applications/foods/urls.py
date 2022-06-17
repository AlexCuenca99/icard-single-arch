# Imports de Django
from django.urls import path

# Imports de views
from . import views

app_name = "foods_app"

urlpatterns = [
    path(
        "alimentos/por-categoria/<category>/",
        views.ListAPIViewFoodByCategory.as_view(),
        name="alimentos-por_categoria",
    )
]
