# Generated by Django 3.2.4 on 2023-12-07 14:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0009_alter_eventmainimage_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='main_image',
            field=models.ImageField(blank=True, null=True, upload_to='images/'),
        ),
    ]