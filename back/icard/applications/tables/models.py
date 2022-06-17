from distutils.command.upload import upload
from django.db import models
from model_utils.models import TimeStampedModel


class Table(TimeStampedModel):
    number = models.IntegerField("Número de mesa", unique=True)
    is_available = models.BooleanField("Disponibilidad", default=False)
    qr_identifier = models.ImageField(
        "Identificador QR",
        upload_to="qr_codes/",
        blank=True,
        null=True,
    )

    class Meta:
        verbose_name = "Mesa"
        verbose_name_plural = "Mesas"

    def __str__(self):
        return (
            "Mesa N°[" + str(self.number) + "] - Disponible"
            if self.is_available
            else "Mesa N°[" + str(self.number) + "] - No disponible"
        )
