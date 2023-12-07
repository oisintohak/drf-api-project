from django.contrib import admin
from .models import *

# Register your models here.


class EventModelAdmin(admin.ModelAdmin):
    readonly_fields = ["created_at", "updated_at"]


admin.site.register(Event, EventModelAdmin)
admin.site.register(EventAdmin)
admin.site.register(EventGuest)
admin.site.register(EventInvite)
# admin.site.register(SubEvent)
# admin.site.register(SubEventAdmin)
# admin.site.register(SubEventGuest)
# admin.site.register(SubEventInvite)
# admin.site.register(SubEventInvite)
admin.site.register(Image)
admin.site.register(EventMainImage)
admin.site.register(EventImage)
