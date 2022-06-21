from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from applications.users.models import User


class UserAdmin(BaseUserAdmin):
    list_display = (
        "email",
        "business_name",
        "first_name",
        "last_name",
        "is_active",
        "is_staff",
    )
    list_filter = ("is_staff", "is_active")
    fieldsets = (
        (None, {"fields": ("email", "password")}),
        ("Información del negocio", {"fields": ("business_name",)}),
        ("Información personal", {"fields": ("first_name", "last_name")}),
        ("Permissions", {"fields": ("is_staff", "is_active")}),
    )
    # add_fieldsets is not a standard ModelAdmin attribute. UserAdmin
    # overrides get_fieldsets to use this attribute when creating a user.
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "email",
                    "business_name",
                ),
            },
        ),
    )
    search_fields = ("email",)
    ordering = ("email",)
    filter_horizontal = ()


admin.site.register(User, UserAdmin)
