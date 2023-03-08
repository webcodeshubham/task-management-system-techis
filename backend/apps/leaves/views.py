from django.db.models import Q
from django_filters import rest_framework as filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters as search
from rest_framework import generics
from apps.users.mixins import CustomLoginRequiredMixin
from rest_framework.response import Response
from .models import Leave
from .serializers import AddLeaveSerializer, LeaveListSerializer, LeaveSerializer, LeaveUpdateSerializer

class LeaveFilter(filters.FilterSet):
    from_date = filters.DateFilter(
        field_name='from_date__date', lookup_expr='gte')
    to_date = filters.DateFilter(
        field_name='to_date__date', lookup_expr='lte')
    class Meta:
        model = Leave
        fields = [
            'leave_type',
            'from_date',
            'to_date',
            'duration',
            'applied_to',
            'created_at',
            'updated_at',
            
            'description',
            'leave_status',
            'leave_balance',
        ]


class LeaveList(generics.ListAPIView):
    queryset = Leave.objects.all().values()
    serializer_class = LeaveListSerializer

    def get(self, request, *args, **kwargs):
        self.queryset = Leave.objects.exclude(
            leave_status='deleted').all().order_by('-id')
        # if request.login_user.role == 'member' and request.login_user.team not in ['admin']:
        #     self.queryset = Leave.objects.exclude(leave_status='deleted').order_by(
        #         '-id').filter(Q(employee_id__employee_id =request.login_user) | Q(user_name__name=request.login_user))
        self.filter_backends = [DjangoFilterBackend, search.SearchFilter]
        self.filterset_class = LeaveFilter
        self.search_fields = ['session_student_name']
        return self.list(request, *args, **kwargs)


class LeaveFind(CustomLoginRequiredMixin, generics.RetrieveAPIView):
    queryset = Leave.objects.all()
    serializer_class = LeaveListSerializer
class AddLeave( generics.CreateAPIView):
    queryset = Leave.objects.all()
    serializer_class = AddLeaveSerializer
class LeaveUpdate(CustomLoginRequiredMixin, generics.RetrieveAPIView, generics.UpdateAPIView):
    queryset = Leave.objects.all()
    serializer_class = LeaveUpdateSerializer

