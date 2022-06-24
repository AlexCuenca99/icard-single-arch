from tabnanny import verbose
from django.db import models
from model_utils.models import TimeStampedModel


class Business(TimeStampedModel):
    name = models.CharField("Nombre", max_length=50, unique=True)
    logo = models.ImageField("Logo", upload_to="uploads/")

    class Meta:
        verbose_name = "Negocio"
        verbose_name_plural = "Negocios"

    def __str__(self):
        return str(self.name)
