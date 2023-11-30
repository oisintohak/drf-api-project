# Generated by Django 3.2.4 on 2023-11-30 10:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0005_auto_20230909_0929'),
    ]

    operations = [
        migrations.CreateModel(
            name='EventImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('event', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='images', to='events.event')),
            ],
        ),
        migrations.CreateModel(
            name='EventMainImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('event', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='main_image', to='events.event')),
            ],
        ),
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='images/')),
            ],
        ),
        migrations.RemoveField(
            model_name='subeventadmin',
            name='event',
        ),
        migrations.RemoveField(
            model_name='subeventadmin',
            name='user',
        ),
        migrations.RemoveField(
            model_name='subeventguest',
            name='event',
        ),
        migrations.RemoveField(
            model_name='subeventguest',
            name='user',
        ),
        migrations.RemoveField(
            model_name='subeventinvite',
            name='event',
        ),
        migrations.RemoveField(
            model_name='subeventinvite',
            name='invitee',
        ),
        migrations.RemoveField(
            model_name='subeventinvite',
            name='inviter',
        ),
        migrations.DeleteModel(
            name='SubEvent',
        ),
        migrations.DeleteModel(
            name='SubEventAdmin',
        ),
        migrations.DeleteModel(
            name='SubEventGuest',
        ),
        migrations.DeleteModel(
            name='SubEventInvite',
        ),
        migrations.AddField(
            model_name='eventmainimage',
            name='image',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='events.image'),
        ),
        migrations.AddField(
            model_name='eventimage',
            name='image',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='events.image'),
        ),
    ]
