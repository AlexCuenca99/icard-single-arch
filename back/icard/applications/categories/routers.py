from rest_framework.routers import DefaultRouter

from .viewsets import *

router = DefaultRouter()

router.register(r"categorias", CategoryAPIViewSet, basename="categorias")

urlpatterns = router.urls
