from django.db import models
from model_utils.models import TimeStampedModel

# Imports de los modelos
from applications.categories.models import Category

# Imports de managers
from .managers import FoodManager


class Food(TimeStampedModel):
    name = models.CharField("Nombre", max_length=50, unique=True)
    category = models.ForeignKey(
        Category,
        on_delete=models.SET_NULL,
        related_name="category_food",
        null=True,
        blank=True,
    )
    description = models.TextField("Descripción", max_length=250)
    price = models.DecimalField("Precio", max_digits=5, decimal_places=2)
    image = models.ImageField("Imagen", upload_to="foods/")
    is_active = models.BooleanField("Activo", default=False)

    objects = FoodManager()
    food_objects = FoodManager()

    class Meta:
        verbose_name = "Alimento"
        verbose_name_plural = "Alimentos"

    def __str__(self):
        return str(self.name) + " - [$" + str(self.price) + "]"
