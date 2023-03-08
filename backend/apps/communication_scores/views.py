
from django.shortcuts import render

from rest_framework.response import Response
from rest_framework import generics
from rest_framework import filters as search
from django_filters import rest_framework as filters
from rest_framework import status

from apps.communication_fields.models import CommunicationField
from apps.communications.models import Communication
from apps.tasks.models import Task
from .serializers import CommunicationScoreSerializer, CommunicationScoreListSerializer
from .models import CommunicationScore
from apps.users.mixins import CustomLoginRequiredMixin
from django_filters.rest_framework import DjangoFilterBackend

# Create your views here.


class CommunicationScoreFilter(filters.FilterSet):
    engineer_name = filters.CharFilter(lookup_expr='iconatins')

    class Meta:
        model = CommunicationScore
        fields = ['communication',
                  'communication_field', 'score', 'comment']


class CommunicationScoreList(CustomLoginRequiredMixin, generics.ListAPIView):
    queryset = CommunicationScore.objects.all()
    serializer_class = CommunicationScoreListSerializer

    def get(self, request, *args, **kwargs):
        self.queryset = CommunicationScore.objects.exclude(
            status='deleted').all().order_by('-id')
        if request.login_user.role == 'member' and request.login_user.team not in ['admin']:
            self.queryset = CommunicationScore.objects.exclude(
                status='deleted').order_by('-id')
            self.filter_backends = [DjangoFilterBackend, search.SearchFilter]
            self.filter_class = CommunicationScoreFilter


class AddCommunicationScore(CustomLoginRequiredMixin, generics.CreateAPIView):
    queryset = CommunicationScore.objects.all()
    serializer_class = CommunicationScoreSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        score = CommunicationScore(serializer.data)
        # communication = Communication.objects.create(task_id=task.id, reviewed_by='null', date_reviewed='null', critical_score='null', general_score='null', error_total='null')

        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class CommunicationScoreUpdate(CustomLoginRequiredMixin, generics.RetrieveAPIView, generics.UpdateAPIView):
    queryset = CommunicationScore.objects.all()
    serializer_class = CommunicationScoreSerializer

    def update(self, request, *args, **kwargs):
        communicationscore = kwargs.pop('communicationscore', False)
        if request.login_user.team == 'communication':
            communicationscore = self.queryset.get_object()
            serializer = self.serializer_class.get_serializer(
                communicationscore, data=request.data, communicationscore=communicationscore)
            serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
