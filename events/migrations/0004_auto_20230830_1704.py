# Generated by Django 3.2.4 on 2023-08-30 17:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0003_auto_20230707_0855'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='lat',
            field=models.DecimalField(decimal_places=8, max_digits=10),
        ),
        migrations.AlterField(
            model_name='event',
            name='long',
            field=models.DecimalField(decimal_places=8, max_digits=10),
        ),
    ]
