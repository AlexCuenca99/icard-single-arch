# Imports de DRF
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter
from rest_framework import viewsets

# Imports de modelos
from .models import Payment

# Imports de serializadores
from .serializers import PaymentSerializer


class PaymentAPIViewSet(viewsets.ModelViewSet):
    serializer_class = PaymentSerializer
    queryset = Payment.objects.all()

    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_fields = ["table", "payment_type", "payment_status"]

    ordering_fields = "__all__"
