# Imports de Django
from django.db import models


class FoodManager(models.Manager):
    def foods_by_category(self, category):
        return self.filter(category=category).order_by("category")
