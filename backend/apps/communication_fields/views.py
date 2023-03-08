from collections import defaultdict
from django.shortcuts import render

from rest_framework import generics
from rest_framework.response import Response
from rest_framework import filters as search
from django_filters import rest_framework as filters

from .serializers import CommunicationFieldSerializer, CommunicationFieldListSerializer
from .models import CommunicationField
from apps.users.mixins import CustomLoginRequiredMixin
from django_filters.rest_framework import DjangoFilterBackend

# Create your views here.


class ComunicationFieldFilter(filters.FilterSet):
    attribute_of_communication = filters.CharFilter(lookup_expr='icontains')

    class Meta:
        model = CommunicationField
        fields = ['communication_type', 'attribute_of_communication']


class CommunicationFieldList(CustomLoginRequiredMixin, generics.ListAPIView):
    queryset = CommunicationField.objects.all()
    serializer_class = CommunicationFieldListSerializer

    def get(self, request, *args, **kwargs):
        transactions = CommunicationField.objects.all().values('id', 'communication_type', 'attribute_of_communication')
        list_result = [entry for entry in transactions]
        groups = defaultdict(list)
        
        for obj in list_result:
            groups[obj['communication_type']].append(obj)
        new_list = groups.values()
        
        return Response(new_list)


class AddCommunicationField(CustomLoginRequiredMixin, generics.CreateAPIView):
    queryset = CommunicationField.objects.all()
    serializer_class = CommunicationFieldSerializer


class CommunicationFieldUpdate(CustomLoginRequiredMixin, generics.RetrieveAPIView):
    queryset = CommunicationField.objects.all()
    serializer_class = CommunicationFieldSerializer
