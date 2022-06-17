from rest_framework import serializers

# Imports de los modelos
from .models import Table


# Serializador para obtener los datos de una mesa
class TableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Table
        fields = [
            "id",
            "number",
            "is_available",
            "created",
        ]
