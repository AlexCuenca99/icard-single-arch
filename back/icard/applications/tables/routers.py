from rest_framework.routers import DefaultRouter

from .viewsets import *

router = DefaultRouter()

router.register(r"mesas", TableAPIViewSet, basename="mesas")

urlpatterns = router.urls
