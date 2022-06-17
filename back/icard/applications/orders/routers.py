from rest_framework.routers import DefaultRouter

from .viewsets import *

router = DefaultRouter()

router.register(r"ordenes", OrderAPIViewSet, basename="ordenes")

urlpatterns = router.urls
