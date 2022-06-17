from tabnanny import verbose
from django.db import models
from model_utils.models import TimeStampedModel

# Imports de los modelos
from applications.tables.models import Table
from applications.foods.models import Food
from applications.payments.models import Payment


class Order(TimeStampedModel):
    ORDER_STATUS_CHOICES = (("0", "PENDIENTE"), ("1", "ENTREGADO"))
    table = models.ForeignKey(
        Table,
        on_delete=models.SET_NULL,
        related_name="table_order",
        null=True,
        blank=True,
    )
    food = models.ForeignKey(
        Food,
        on_delete=models.SET_NULL,
        related_name="food_order",
        null=True,
        blank=True,
    )
    payment = models.ForeignKey(
        Payment, on_delete=models.CASCADE, null=True, blank=True
    )
    status = models.CharField(
        "Estado", max_length=10, choices=ORDER_STATUS_CHOICES, default=0
    )
    is_close = models.BooleanField("Cerrado", default=False)

    class Meta:
        verbose_name = "Orden"
        verbose_name_plural = "Órdenes"

    def __str__(self):
        return str(self.table)
