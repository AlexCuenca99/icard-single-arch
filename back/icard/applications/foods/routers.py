from rest_framework.routers import DefaultRouter

from .viewsets import *

router = DefaultRouter()

router.register(r"alimentos", FoodAPIViewSet, basename="alimentos")

urlpatterns = router.urls
