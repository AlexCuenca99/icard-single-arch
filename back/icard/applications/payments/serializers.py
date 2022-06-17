from rest_framework import serializers

# Imports de los modelos
from .models import Payment

# Import de las serializadores
from applications.tables.serializers import TableSerializer

# Serializador para obtener los datos de una mesa
class PaymentSerializer(serializers.ModelSerializer):
    table_data = TableSerializer(source="table", read_only=True)

    class Meta:
        model = Payment
        fields = [
            "id",
            "table",
            "table_data",
            "amount",
            "payment_status",
            "payment_type",
            "created",
        ]
