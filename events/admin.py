from django.contrib import admin
from .models import *
# Register your models here.


admin.site.register(Event)
admin.site.register(EventAdmin)
admin.site.register(EventGuest)
admin.site.register(EventInvite)
admin.site.register(SubEvent)
admin.site.register(SubEventAdmin)
admin.site.register(SubEventGuest)
admin.site.register(SubEventInvite)
