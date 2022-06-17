# Generated by Django 3.2.13 on 2022-05-15 01:19

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import model_utils.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('categories', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Food',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', model_utils.fields.AutoCreatedField(default=django.utils.timezone.now, editable=False, verbose_name='created')),
                ('modified', model_utils.fields.AutoLastModifiedField(default=django.utils.timezone.now, editable=False, verbose_name='modified')),
                ('name', models.CharField(max_length=50, unique=True, verbose_name='Nombre')),
                ('description', models.TextField(max_length=250, verbose_name='Descripción')),
                ('price', models.DecimalField(decimal_places=2, max_digits=5, verbose_name='Precio')),
                ('image', models.ImageField(upload_to='foods/', verbose_name='Imagen')),
                ('is_active', models.BooleanField(default=False, verbose_name='Activo')),
                ('category', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='category_food', to='categories.category')),
            ],
            options={
                'verbose_name': 'Alimento',
                'verbose_name_plural': 'Alimentos',
            },
        ),
    ]