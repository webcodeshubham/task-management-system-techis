from django.http import HttpResponseRedirect
from pytz import timezone
from rest_framework import generics
from rest_framework import filters as search
from django_filters import rest_framework as filters
from .serializers import TargetListSerializer, TargetSerializer, TargetUpdateSerializer
from .models import Target
from apps.users.mixins import CustomLoginRequiredMixin
from django_filters.rest_framework import DjangoFilterBackend
from django.db.models import Q
from rest_framework.response import Response


class TargetFilter(filters.FilterSet):
    project_name = filters.CharFilter(lookup_expr='icontains')
    project_student_name = filters.CharFilter(lookup_expr='icontains')
    project_start_date = filters.DateFilter(
        field_name='project_start_date__date', lookup_expr='gte')
    project_due_date = filters.DateFilter(
        field_name='project_due_date__date', lookup_expr='lte')
    cohort = filters.CharFilter(lookup_expr='icontains')

    class Meta:
        model = Target
        fields = [
            'user_id',
            'status',
            'type',
            'target_number',
            'cohort',
            'project_start_date',
            'project_due_date',
            'updated_by',
            'created_by'
        ]


class TargetUpdate(CustomLoginRequiredMixin, generics.RetrieveAPIView, generics.UpdateAPIView):
    queryset = Target.objects.all()
    serializer_class = TargetUpdateSerializer

class TargetFind(CustomLoginRequiredMixin, generics.RetrieveAPIView):
    queryset = Target.objects.all()
    serializer_class = TargetListSerializer

class TargetList(CustomLoginRequiredMixin, generics.ListAPIView):
    queryset = Target.objects.exclude(status='deleted').all().order_by('-id')
    serializer_class = TargetListSerializer

    def get(self, request, *args, **kwargs):
        self.queryset = Target.objects.exclude(status='deleted').all().filter(
            user_id__team=request.login_user.team).order_by('-id')
        if request.login_user.team in ['admin']:
            self.queryset = Target.objects.all()
        self.filter_backends = [DjangoFilterBackend, search.SearchFilter]
        self.filterset_class = TargetFilter
        self.search_fields = ['status', 'type', 'cohort',
                              'project_start_date', 'project_due_date', 'project_student_name']
        return self.list(request, *args, **kwargs)


class AddTarget(CustomLoginRequiredMixin, generics.CreateAPIView):
    queryset = Target.objects.all()
    serializer_class = TargetSerializer
   
    
