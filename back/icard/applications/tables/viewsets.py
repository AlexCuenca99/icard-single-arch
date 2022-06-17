# Imports de DRF
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets

# Imports de modelos
from .models import Table

# Imports de serializadores
from .serializers import TableSerializer


class TableAPIViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = TableSerializer
    queryset = Table.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["is_available", "number"]
