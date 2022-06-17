from tabnanny import verbose
from django.db import models
from model_utils.models import TimeStampedModel

# Imports de los modelos
from applications.tables.models import Table

# Enums para no poder crear mas opciones desde el ORM
PAYMENT_TYPES_ENUM = (("0", "EFECTIVO"), ("1", "TARJETA DE CRÉDITO/DEBITO"))
PAYMENT_STATUS_ENUM = (("0", "PENDIENTE"), ("1", "PAGADO"))


class Payment(TimeStampedModel):
    table = models.ForeignKey(Table, on_delete=models.SET_NULL, null=True)
    amount = models.DecimalField("Total", max_digits=10, decimal_places=2)
    payment_type = models.CharField(
        "Tipo de pago", max_length=20, choices=PAYMENT_TYPES_ENUM, default=0
    )
    payment_status = models.CharField(
        "Estado del pago", max_length=15, choices=PAYMENT_STATUS_ENUM, default=0
    )

    class Meta:
        verbose_name = "Pago"
        verbose_name_plural = "Pagos"

    def __str__(self):
        return str(self.table)
