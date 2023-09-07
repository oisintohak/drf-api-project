from django.db.models import Count
from django_filters.rest_framework import (
    DjangoFilterBackend, FilterSet, NumberFilter, DateFilter)
from rest_framework import filters, generics
from rest_framework.pagination import LimitOffsetPagination

from main.permissions import IsCreatorOrReadOnly

from .models import Event
from .serializers import EventSerializer


class EventFilter(FilterSet):
    min_lat = NumberFilter(field_name='lat', lookup_expr='gte')
    max_lat = NumberFilter(field_name='lat', lookup_expr='lte')
    min_long = NumberFilter(field_name='long', lookup_expr='gte')
    max_long = NumberFilter(field_name='long', lookup_expr='lte')
    starts_after = DateFilter(
        field_name='starts_at', lookup_expr='date__gte')
    starts_before = DateFilter(
        field_name='starts_at', lookup_expr='date__lte')
    ends_after = DateFilter(field_name='ends_at', lookup_expr='date__gte')
    ends_before = DateFilter(field_name='ends_at', lookup_expr='date__lte')

    class Meta:
        model = Event
        fields = ['lat', 'long']


class Paginator(LimitOffsetPagination):
    default_limit = 50


class EventList(generics.ListCreateAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    pagination_class = Paginator
    filter_backends = [
        DjangoFilterBackend,
    ]
    filterset_class = EventFilter

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class EventDetail(generics.RetrieveUpdateAPIView):

    queryset = Event.objects.all()
    permission_classes = [IsCreatorOrReadOnly]
    serializer_class = EventSerializer
