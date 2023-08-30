from django.db.models import Count
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, generics
from rest_framework.pagination import LimitOffsetPagination

from main.permissions import IsCreatorOrReadOnly

from .models import Event
from .serializers import EventSerializer


class Paginator(LimitOffsetPagination):
    default_limit = 50

class EventList(generics.ListCreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    pagination_class = Paginator
    
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class EventDetail(generics.RetrieveUpdateAPIView):

    queryset = Event.objects.all()
    permission_classes = [IsCreatorOrReadOnly]
    serializer_class = EventSerializer
