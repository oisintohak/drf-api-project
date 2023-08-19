from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from .views import Index
from django.urls import re_path

urlpatterns = [
    path('auth/', include('dj_rest_auth.urls')),
    path(
        'auth/registration/', include('dj_rest_auth.registration.urls')
    ),
    path('admin/', admin.site.urls),
    path('profiles/', include('profiles.urls')),
    path('events/', include('events.urls')),
    # path('', TemplateView.as_view(template_name='index.html')),
    re_path(r'.*', Index.as_view())
]
