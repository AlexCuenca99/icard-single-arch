from rest_framework import serializers

# Imports de los modelos
from .models import Food

# Imports de las categorías
from applications.categories.serializers import CategorySerializer


# Serializador para obtener los datos de una alimento
class FoodSerializer(serializers.ModelSerializer):
    category_data = CategorySerializer(source="category", read_only=True)

    class Meta:
        model = Food
        fields = [
            "id",
            "name",
            "category",
            "category_data",
            "description",
            "price",
            "image",
            "is_active",
            "created",
        ]
