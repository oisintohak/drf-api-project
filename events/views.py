from django.db.models import BooleanField, Case, Count, ExpressionWrapper, F, Q, When
from django.db.models.functions import Now
from django_filters.rest_framework import (
    DateFilter,
    DjangoFilterBackend,
    FilterSet,
    NumberFilter,
)
from rest_framework import filters, generics
from rest_framework.pagination import LimitOffsetPagination

from main.permissions import IsCreatorOrReadOnly

from .models import Event
from .serializers import EventSerializer


class EventFilter(FilterSet):
    min_lat = NumberFilter(field_name="lat", lookup_expr="gte")
    max_lat = NumberFilter(field_name="lat", lookup_expr="lte")
    min_long = NumberFilter(field_name="long", lookup_expr="gte")
    max_long = NumberFilter(field_name="long", lookup_expr="lte")
    starts_after = DateFilter(field_name="starts_at", lookup_expr="date__gte")
    starts_before = DateFilter(field_name="starts_at", lookup_expr="date__lte")
    ends_after = DateFilter(field_name="ends_at", lookup_expr="date__gte")
    ends_before = DateFilter(field_name="ends_at", lookup_expr="date__lte")

    class Meta:
        model = Event
        fields = ["lat", "long"]


class Paginator(LimitOffsetPagination):
    default_limit = 50


class EventList(generics.ListCreateAPIView):
    # https://www.reddit.com/r/django/comments/jr3ekq/f_objects_comparing_a_field_to_the_current_time/
    queryset = Event.objects.annotate(
        is_over=Case(
            When(Q(ends_at__lt=Now()), then=True),
            default=False,
            output_field=BooleanField(),
        )
    )
    serializer_class = EventSerializer
    pagination_class = Paginator
    filter_backends = [
        DjangoFilterBackend,
    ]
    filterset_class = EventFilter

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def get_serializer(self, *args, **kwargs):
        # https://stackoverflow.com/a/31979444
        serializer_class = self.get_serializer_class()
        fields = None
        exclude = None
        if self.request.method == "GET":
            query_fields = self.request.query_params.get("fields", None)
            query_exclude = self.request.query_params.get("exclude", None)
            if query_fields:
                fields = tuple(query_fields.split(","))
            if query_exclude:
                exclude = tuple(query_exclude.split(","))
        kwargs["context"] = self.get_serializer_context()
        kwargs["fields"] = fields
        kwargs["exclude"] = exclude
        return serializer_class(*args, **kwargs)


class EventDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Event.objects.all()
    permission_classes = [IsCreatorOrReadOnly]
    serializer_class = EventSerializer
