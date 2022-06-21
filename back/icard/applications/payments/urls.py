from venv import create
from django.urls import path
from .views import *

app_name = "payments_app"

urlpatterns = [
    path("stripe/test-payment/", test_payment, name="test-payment"),
    path("stripe/save-stripe-info/", save_stripe_info, name="save-stripe-info"),
    path("stripe/webhook/", webhook, name="stripe-webhook"),
]
