from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from .views import Index
from django.urls import re_path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('dj_rest_auth.urls')),
    path(
        'api/auth/registration/', include('dj_rest_auth.registration.urls')
    ),
    path('api/profiles/', include('profiles.urls')),
    path('api/events/', include('events.urls')),
    # path('events/', include('events.urls')),
    # path('', TemplateView.as_view(template_name='index.html')),
    re_path(r'.*', Index.as_view())
]
