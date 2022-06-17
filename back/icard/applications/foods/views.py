# Imports de Third-Party-Apps
from rest_framework import generics

# Imports de serializadores
from .serializers import FoodSerializer

# Imports de modelos
from .models import Food


# Vista para filtrar los alimentos por categoría
class ListAPIViewFoodByCategory(generics.ListAPIView):
    """Vista para filtrar los alimentos por categoría

    Args:
        generics (DRF Generics): Vista API para realizar peticiones tipo GET

    Returns:
        Food: Retorna todos los alimentos que pertenecen a una categoría
    """
    serializer_class = FoodSerializer

    def get_queryset(self):
        category = self.kwargs["category"]
        return Food.food_objects.foods_by_category(category)
