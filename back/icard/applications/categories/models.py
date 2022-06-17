from django.db import models
from model_utils.models import TimeStampedModel


class Category(TimeStampedModel):
    name = models.CharField("Nombre", max_length=100, unique=True)
    image = models.ImageField("Imagen", upload_to="categories/")

    class Meta:
        verbose_name = "Categoria"
        verbose_name_plural = "Categorias"

    def __str__(self):
        return "[" + str(self.id) + "] - " + str(self.name)
