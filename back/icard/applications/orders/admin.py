from django.contrib import admin

# Imports de los modelos
from .models import Order


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ["table", "food", "status", "created"]
