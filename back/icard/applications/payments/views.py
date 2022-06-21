# Imports de Django
from operator import itemgetter
from click import confirm
from django.http import JsonResponse

# Imports de Stripe
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import environ
import stripe

# Initialize ENVIRON
env = environ.Env()
environ.Env.read_env()

stripe.api_key = env("STRIPE_SECRET_KEY")
endpoint_secret = env("ENDPOINT_SECRET")


@api_view(["POST"])
def test_payment(request):
    test_payment_intent = stripe.PaymentIntent.create(
        amount=1000,
        currency="pln",
        payment_method_types=["card"],
        receipt_email="test@example.com",
    )

    return Response(status=status.HTTP_200_OK, data=test_payment_intent)


@api_view(["POST"])
def save_stripe_info(request):
    data = request.data
    email = data["email"]
    payment_method_id = data["payment_method_id"]
    extra_msg = "El usuario ya ha sido ingresado"

    # checking if customer with provided email already exists
    customer_data = stripe.Customer.list(email=email).data

    # if the array is empty it means the email has not been used yet
    if len(customer_data) == 0:
        # creating customer
        customer = stripe.Customer.create(
            email=email,
            payment_method=payment_method_id,
            invoice_settings={"default_payment_method": payment_method_id},
        )
    else:
        customer = customer_data[0]
        extra_msg = "Customer already existed."

    stripe.PaymentIntent.create(
        customer=customer,
        payment_method=payment_method_id,
        currency="usd",  # Tipo de moneda de cambio para la transacción
        amount=1000,  # Monto en monedas de un centavo (1000 centavos -> $10)
        confirm=True,
    )

    stripe.Subscription.create(
        customer=customer, items=[{"price": "price_1LCdgMGdOLNeSqEVa7gHdmVs"}]
    )
    return Response(
        status=status.HTTP_200_OK,
        data={
            "message": "Success",
            "data": {"customer_id": customer.id, "extra_msg": extra_msg},
        },
    )


@api_view(["POST"])
def webhook(request):
    event = None
    payload = request.data
    sig_header = request.headers["STRIPE_SIGNATURE"]

    try:
        event = stripe.Webhook.construct_event(payload, sig_header, endpoint_secret)
    except ValueError as e:
        # Invalid payload
        raise e
    except stripe.error.SignatureVerificationError as e:
        # Invalid signature
        raise e

    # Handle the event
    if event["type"] == "payment_intent.succeeded":
        payment_intent = event["data"]["object"]
    # ... handle other event types
    else:
        print("Unhandled event type {}".format(event["type"]))

    return JsonResponse(success=True)
