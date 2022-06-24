from rest_framework.routers import DefaultRouter

from .viewsets import *

router = DefaultRouter()

router.register(r"negocio", BusinessAPIViewSet, basename="negocio")

urlpatterns = router.urls
