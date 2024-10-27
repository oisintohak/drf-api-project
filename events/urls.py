from django.urls import path
from . import views

urlpatterns = [
    path('events/', views.EventList.as_view()),
    path('events/<int:pk>/', views.EventDetail.as_view()),
    path('event-favourites/', views.EventFavouriteList.as_view()),
    path('event-favourites/<int:pk>/', views.EventFavouriteDetail.as_view()),
    path('attendees/', views.EventAttendeeList.as_view()),
    path('attendees/<int:pk>/', views.EventAttendeeDetail.as_view()),
]
