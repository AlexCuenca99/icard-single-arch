from django.contrib import admin

# Imports de los modelos
from .models import Payment


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = [
        "id",
        "table",
        "amount",
        "payment_status",
        "payment_type",
        "created",
    ]
