from rest_framework.routers import DefaultRouter

from .viewsets import *

router = DefaultRouter()

router.register(r"pagos", PaymentAPIViewSet, basename="pagos")

urlpatterns = router.urls
