from django.db.models import Count
from rest_framework import generics, filters
from django_filters.rest_framework import DjangoFilterBackend
from main.permissions import IsCreatorOrReadOnly
from .models import Event
from .serializers import EventSerializer


class EventList(generics.ListCreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class EventDetail(generics.RetrieveUpdateAPIView):

    queryset = Event.objects.all()
    permission_classes = [IsCreatorOrReadOnly]
    serializer_class = EventSerializer
