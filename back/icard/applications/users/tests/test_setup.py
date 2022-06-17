from django.urls import reverse

from rest_framework.test import APITestCase

from faker import Faker


class TestSetup(APITestCase):
    def setUp(self):
        self.register_url = reverse("users_app:registro")
        self.login_url = reverse("users_app:login")

        self.fake = Faker()

        self.user_data = {
            "email": self.fake.email(),
            "username": self.fake.email().split("@")[0],
            "password": self.fake.email(),
        }
        return super().setUp()

    def tearDown(self):
        return super().tearDown()
