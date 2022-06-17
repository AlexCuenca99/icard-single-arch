from rest_framework import serializers

# Imports de los modelos
from .models import Order

# Import de las vistas
from applications.tables.serializers import TableSerializer
from applications.foods.serializers import FoodSerializer

# Serializador para obtener los datos de una mesa
class OrderSerializer(serializers.ModelSerializer):
    table_data = TableSerializer(source="table", read_only=True)
    food_data = FoodSerializer(source="food", read_only=True)

    class Meta:
        model = Order
        fields = [
            "id",
            "table",
            "table_data",
            "food",
            "food_data",
            "payment",
            "status",
            "created",
            "is_close",
        ]
