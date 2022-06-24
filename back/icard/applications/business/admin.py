from django.contrib import admin

# Modelos
from applications.business.models import Business


@admin.register(Business)
class BusinessAdmin(admin.ModelAdmin):
    list_display = ["name", "logo"]
