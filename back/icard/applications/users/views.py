# Imports de DRF
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response

# Imports de Serializadores
from .serializers import (
    UserSerializer,
)


# Vista para obtener mis datos de registro
class UserAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)
