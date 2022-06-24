# DRF
from rest_framework.permissions import AllowAny
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets

# Modelos
from .models import Business

# Serializadores
from .serializers import BusinessSerializer


class BusinessAPIViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    serializer_class = BusinessSerializer
    queryset = Business.objects.all()
