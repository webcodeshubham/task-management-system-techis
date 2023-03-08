from django.shortcuts import render
from rest_framework.response import Response
from .models import MemberLeave
from apps.users.models import User
from django_filters import rest_framework as filters
from apps.users.mixins import CustomLoginRequiredMixin
from rest_framework import generics
from .serializers import MemberLeaveAddSerializer, MemberLeaveListSerializer, MemberLeaveSerializer
from rest_framework import serializers
# Create your views here.


class MemberLeaveFilter(filters.FilterSet):
    user = filters.CharFilter(lookup_expr='icontains')
    status = filters.CharFilter(lookup_expr='icontains')
    to_date = filters.CharFilter(field_name='to_date', lookup_expr='gte')
    from_date = filters.CharFilter(field_name='from_date', lookup_expr='lte')

    class Meta:
        model = MemberLeave
        fields = [
            'user',
            'status',
            'from_date',
            'to_date',
            'message'
        ]


class MemberLeavesList(CustomLoginRequiredMixin, generics.ListAPIView):
    queryset = MemberLeave.objects.all()
    serializer_class = MemberLeaveListSerializer


class MemberLeaveAdd(CustomLoginRequiredMixin, generics.CreateAPIView):
    queryset = MemberLeave.objects.all()
    serializer_class = MemberLeaveAddSerializer



class MemberLeaveUpdate(CustomLoginRequiredMixin, generics.RetrieveAPIView, generics.UpdateAPIView):
    queryset = MemberLeave.objects.all()
    serializer_class = MemberLeaveSerializer

    def put(self, request, pk, format=None):
        member_leave = self.get_object()
        member_leave.user = User.objects.get(pk=request.login_user.id)
        member_leave.status = request.data['status']
        
        status_case1 = ['forwarded', 'req_modification']
        status_case2 = ['rejected', 'approved']
        roles = ['leader', 'manager', 'director']
        status = request.data['status']
        if (status in status_case1 and request.login_user.role != "co-ordinator"):
            raise serializers.ValidationError({"error":"You can't forward the leave"})
        if (status in status_case2 and request.login_user.role not in roles):
            raise serializers.ValidationError({"error":"You can't approve the leave"})

        member_leave.from_date = request.data['from_date']
        member_leave.to_date = request.data['to_date']
        member_leave.message = request.data['message']
        member_leave.save()
        serializer = MemberLeaveSerializer([member_leave], many=True)
        return Response(serializer.data)
