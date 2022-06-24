from rest_framework import serializers

# Modelos
from .models import Business


# Serializador para obtener los datos de una alimento
class BusinessSerializer(serializers.ModelSerializer):
    class Meta:
        model = Business
        fields = [
            "id",
            "name",
            "logo",
            "created",
        ]
