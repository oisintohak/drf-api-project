from django.db import models
from django.contrib.auth.models import User


class Event(models.Model):
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=400)
    starts_at = models.DateTimeField()
    ends_at = models.DateTimeField()
    lat = models.DecimalField(max_digits=14, decimal_places=10)
    long = models.DecimalField(max_digits=14, decimal_places=10)
    address = models.CharField(max_length=400)
    place_id = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return (f'Event title: {self.title}. '
                f'Starts: {self.starts_at.strftime("%H:%M:%S on %d/%m/%Y")}.'
                f'Ends: {self.ends_at.strftime("%H:%M:%S on %d/%m/%Y")}')


class EventAdmin(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)


class EventInvite(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    invitee = models.ForeignKey(
        User, on_delete=models.CASCADE,
        related_name='event_invites_received')
    inviter = models.ForeignKey(
        User, on_delete=models.CASCADE,
        related_name='event_invites_sent')
    created_at = models.DateTimeField(auto_now_add=True)
    attending = models.BooleanField()


class EventGuest(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)


class SubEvent(models.Model):
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    title = models.CharField(max_length=400)
    starts_at = models.DateTimeField()
    ends_at = models.DateTimeField()
    location = models.URLField()  # correct field type to be determined
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return (f'SubEvent title: {self.title}. '
                f'Starts: {self.starts_at.strftime("%H:%M:%S on %d/%m/%Y")}.'
                f'Ends: {self.ends_at.strftime("%H:%M:%S on %d/%m/%Y")}')


class SubEventAdmin(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)


class SubEventInvite(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    invitee = models.ForeignKey(
        User, on_delete=models.CASCADE,
        related_name='sub_event_invites_received')
    inviter = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='sub_event_invites_sent')
    created_at = models.DateTimeField(auto_now_add=True)
    attending = models.BooleanField()


class SubEventGuest(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
