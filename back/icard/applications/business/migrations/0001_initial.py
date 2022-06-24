# Generated by Django 3.2.13 on 2022-06-23 04:29

from django.db import migrations, models
import django.utils.timezone
import model_utils.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Business',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', model_utils.fields.AutoCreatedField(default=django.utils.timezone.now, editable=False, verbose_name='created')),
                ('modified', model_utils.fields.AutoLastModifiedField(default=django.utils.timezone.now, editable=False, verbose_name='modified')),
                ('name', models.CharField(max_length=50, unique=True, verbose_name='Nombre')),
                ('logo', models.ImageField(upload_to='uploads/', verbose_name='Logo')),
            ],
            options={
                'verbose_name': 'Negocio',
                'verbose_name_plural': 'Negocios',
            },
        ),
    ]
