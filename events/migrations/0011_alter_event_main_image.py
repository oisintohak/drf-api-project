# Generated by Django 3.2.4 on 2023-12-07 16:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0010_alter_event_main_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='main_image',
            field=models.ImageField(blank=True, default='../default.png', null=True, upload_to='images/'),
        ),
    ]
