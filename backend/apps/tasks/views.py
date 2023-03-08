from django.db.models import Q
from django_filters import rest_framework as filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters as search
from rest_framework import generics
from rest_framework.response import Response
from apps.communication_fields.models import CommunicationField
from apps.communication_scores.models import CommunicationScore
from apps.communications.models import Communication
from apps.tasks.serializers import TaskShortInfoSerializer
from apps.users.mixins import CustomLoginRequiredMixin
from .models import Task
from .serializers import AddTaskSerializer, TaskListSerializer, TaskSerializer, TaskUpdateSerializer
class TaskFilter(filters.FilterSet):
    session_student_name = filters.CharFilter(lookup_expr="icontains")
    start_date = filters.DateFilter(
        field_name='start_date__date', lookup_expr='gte')
    due_date = filters.DateFilter(
        field_name='due_date__date', lookup_expr='lte')
    class Meta:
        model = Task
        fields = [
            "user_id_assigned_by",
            "user_id_assigned",
            "type",
            "student_support_type",
            "status",
            "batches",
            "shifts",
            'start_date',
            'due_date',
            'created_at',
            'updated_by',
        ]


class TaskList(CustomLoginRequiredMixin, generics.ListAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskListSerializer

    def get(self, request, *args, **kwargs):
        self.queryset = Task.objects.exclude(
            status='deleted').all().order_by('-id')
        if request.login_user.role == 'member' and request.login_user.team not in ['admin']:
            self.queryset = Task.objects.exclude(status='deleted').order_by(
                '-id').filter(Q(user_id_assigned_by__name=request.login_user) | Q(user_id_assigned__name=request.login_user))
        self.filter_backends = [DjangoFilterBackend, search.SearchFilter]
        self.filterset_class = TaskFilter
        self.search_fields = ['session_student_name']
        return self.list(request, *args, **kwargs)


class TaskFind(CustomLoginRequiredMixin, generics.RetrieveAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskListSerializer


class AddTask(CustomLoginRequiredMixin, generics.CreateAPIView):
    queryset = Task.objects.all()
    serializer_class = AddTaskSerializer
    

class TaskUpdate(CustomLoginRequiredMixin, generics.RetrieveAPIView, generics.UpdateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskUpdateSerializer


class CheckCommunication(CustomLoginRequiredMixin, generics.RetrieveAPIView, generics.CreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    def get(self, request, *args, **kwargs):
        task = self.get_object()
        serializer = TaskShortInfoSerializer(task)
        communication_fields = CommunicationField.objects.all()
        
        # if task don't have communication then we create communication
        if hasattr(task, 'task_communication') == False:
            communication = Communication.objects.create(task=task)

            # create CommunicationScores
            for field in communication_fields:
                CommunicationScore.objects.create(
                    communication=communication, communication_field=field)

        # check communication score is up to date with commnication_fields if not then create new score
        if hasattr(task, 'task_communication'):
            field_ids = communication_fields.values_list('id', flat=True)
            communication = task.task_communication
            scores = task.task_communication.communication_scores.all(
            ).values_list('communication_field', flat=True)

            for id in field_ids:
                if not id in scores:
                    CommunicationScore.objects.create(
                        communication=communication, communication_field=CommunicationField.objects.get(pk=id))

        return Response(serializer.data)
