# Getting Started with iCard API

This project corresponds to the API for iCard.

&nbsp;

**Welcome!** ✅

To see this project in action, you can go to [CS50 Web 2020 | Project 2 | Commerce](https://youtu.be/nE4WT1s1l6U)

Or, stay on this page and see Commerce Project contents based on the [structure guidelines](https://cs50.harvard.edu/web/2020/projects/2/commerce/):
s
&nbsp;

## 👩‍🏫 How it woks?

Don't worry. It is easy to use. You must follow these steps:

1. **Required Packages:** Before starting, you need to install Python and pip. Then you have to install Django.

2. **Download the source project:** Download or clone the project to your computer.

3. **Open the project (Optional):** Once you have downloaded the project, extract it! You should open the project in your code editor so that you can see or understand the structure of the project.

4. **Before execute the project:**

    1. **makemigrations:** Open new terminal and inside the root directory type: `python manage.py makemigrations` to create the migrations (generate the SQL commands).
    2. **migrate:** Then run `python manage.py migrate` to run the migrations (execute the SQL commands).
    3. **Create a superuser:** To get logged into the application you have to create a superuser. Use `python manage.py createsuperuser`then complete the requested data.

5. **Execute the project:** Now you have completed the previous steps, run `python manage.py runserver` on the root directory. If everything went well, you should be able to observe a line with the following: `Starting development server at http://127.0.0.1:8000/`. All you have to do is copy that address and paste it into your search bar. Also, you can type the address `localhost:8000`.

&nbsp;

## 🏠 Home Page when

### Not logged in

If you are not logged in, when you visit the site, you are able to see the active listings and filter them by category. If you want to access to add a new listing, or bid for a list, you have to login.

### Logged in

If you are logged in, when you visit the site, you are able to see the active listings, filter them by category. Also, you can access to see listings details (bids, comments, all listing pictures, etc.) Also, you can offer for lists, comment on a listing, win an auction, or close the listing if you are the owner.

## 📑 Add Auction Listing

When you want to add a new listing, you have to provide some data:

-   Title
-   Description
-   Initial bid
-   Category
-   At most 4 pictures.

Then you have to Upload the listing.

## 💰 Bid on an active listing

By clicking on a list, and if that list is active you can bid for the listing. Remember, your bid must be greater than the last bid.

&nbsp;

## 📢 Comment on a listing

By clicking comments tab, you are able to add a comment to the current selected listing. You can add a title for the comment, and the content of the comment.

&nbsp;

## 🛎️ Closing and Winning the bid

If you are **the owner** of the listing and you want to close at least one is nedded. When you close, the person who have done the last bid will be who **win the auction.**

&nbsp;

## 📌 My Watchlist

If you are interested in a listing, you are able to add to your Watchlist.

You can click on your Watchlist in order to see only the listings you had mark. When you are not interested on the list, you can remove it from your Watchlist.

&nbsp;

## ❗❓ Troubleshooting

-   **TimeStampedModel** Excecute ´pip install django-model-utils´: ['django-model-utils'](https://django-model-utils.readthedocs.io/en/latest/setup.html)

-   **Run ´python manage.py test´:** Make sure that any test.py file exists in main app folder. Then, make sure that the user used as admin in the database project have the permission to create a database. [django test app error - Got an error creating the test database: permission denied to create database](https://stackoverflow.com/questions/14186055/django-test-app-error-got-an-error-creating-the-test-database-permission-deni)

-   **_Safe_ built-in template tag:** If you see something like this `<h1>Git</h1> <p>Git is a version...` when you try to render the content, most likely you are missing the _[safe tag](https://docs.djangoproject.com/en/3.2/ref/templates/builtins/#safe)_ when you try to render.

-   **Using static files:** If you have an error corresponding to static files. You probably want to see these links: [Django TemplateSyntaxError - 'staticfiles' is not a registered tag library](https://stackoverflow.com/questions/55929472/django-templatesyntaxerror-staticfiles-is-not-a-registered-tag-library), [Django: Invalid block tag: 'static', expected 'endif'](https://stackoverflow.com/questions/31117893/django-invalid-block-tag-static-expected-endif)

-   **Images Carousel:** In order to create the carousel slider on this project, you may want see [Tailwind CSS Carousel Slider Examples](https://larainfo.com/blogs/tailwind-css-carousel-slider-examples)

&nbsp;

**By:** _Alex Cuenca_
