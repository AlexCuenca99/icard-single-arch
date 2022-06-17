# Imports de DRF
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets

# Import de los modelos
from .models import Food

# Imports de serializadores
from .serializers import FoodSerializer


class FoodAPIViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = FoodSerializer
    queryset = Food.food_objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["category", "is_active"]
