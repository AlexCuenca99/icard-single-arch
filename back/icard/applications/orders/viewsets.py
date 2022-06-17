# Imports de DRF
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter
from rest_framework import viewsets

# Imports de modelos
from .models import Order

# Imports de serializadores
from .serializers import OrderSerializer


class OrderAPIViewSet(viewsets.ModelViewSet):
    serializer_class = OrderSerializer
    queryset = Order.objects.all()

    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_fields = ["table", "is_close", "payment", "status"]

    ordering_fields = "__all__"
