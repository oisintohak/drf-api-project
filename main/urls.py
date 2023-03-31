from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from .views import FacebookLogin, GoogleLogin

from dj_rest_auth import urls

urlpatterns = [
    path('', TemplateView.as_view(template_name='index.html')),
    path('auth/', include('dj_rest_auth.urls')),
    path(
        'auth/registration/', include('dj_rest_auth.registration.urls')
    ),
    path('auth/facebook/', FacebookLogin.as_view(), name='fb_login'),
    path('auth/google/', GoogleLogin.as_view(), name='google_login'),
    path('accounts/', include('allauth.urls'), name='socialaccount_signup'),
    path('admin/', admin.site.urls),
    path('profiles/', include('profiles.urls')),
    path('events/', include('events.urls')),
]
