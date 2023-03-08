from apps.communications.models import Communication
from apps.users.serializers import UserInfoSerializer
from .models import Task
from .models import User
from rest_framework import serializers
from apps.communication_fields.models import CommunicationField
from apps.communication_scores.models import CommunicationScore
class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'
class AddTaskSerializer(serializers.ModelSerializer):
    class Meta:  
        model = Task
        fields = [
            'id',
            'status',
            'name',
            'type',
            'duration',
            'start_date',
            'due_date',
            'note',
            'student_support_type',
            'session_topic',
            'session_feedback',
            'session_student_name',
            'session_video_link',
            'updated_by',
            'created_at',
            'updated_at',
            'user_id_assigned_by',
            'user_id_assigned',
        ]
        extra_kwargs = {
            'user_id_assinged': {'required': False},
            'user_id_assinged_by': {'required': False},
        }

        read_only_fields =  [
            'updated_by',
            'batches',
            'shifts',
        ]


    def create(self, validated_data):
        request = self.context['request']
        data = validated_data   
        if data['type'] == 'internal_support':
            data['session_topic'] = 'N/A'
            data['session_feedback'] = 'no'
            data['session_student_name'] = 'N/A'

        if request.login_user.team == 'engineer' and request.login_user.role == 'member' :
            data['user_id_assigned'] = request.login_user
            data['user_id_assigned_by'] = request.login_user
        data['shifts'] = data['user_id_assigned'].shifts
        data['batches'] = data['user_id_assigned'].batch

        task = Task.objects.create(**data)
        communication = Communication.objects.create(task=task)
        communication_fields = CommunicationField.objects.all()

        # create CommunicationScores
        for field in communication_fields:
            CommunicationScore.objects.create(communication=communication, communication_field=field )
        return task

class TaskUpdateSerializer(serializers.ModelSerializer): 
    class Meta:
        model = Task
        fields = [
            'id',
            'status',
            'name',
            'type',
            'duration',
            'start_date',
            'due_date',
            'note',
            'batches',
            'shifts',
            'student_support_type',
            'session_topic',
            'session_feedback',
            'session_student_name',
            'session_video_link',
            'updated_by',
            'created_at',
            'updated_at',
            'user_id_assigned_by',
            'user_id_assigned',
        ]
        read_only_fields =  [
            'updated_by',
        ]
    def update(self, instance, validated_data):
        validated_data['updated_by'] = self.context['request'].login_user
        if validated_data['type'] == 'internal_support':
            validated_data['session_topic'] = 'N/A'
            validated_data['session_feedback'] = 'no'
            validated_data['session_student_name'] = 'N/A'
        validated_data['shifts'] = validated_data['user_id_assigned'].shifts
        validated_data['batches'] = validated_data['user_id_assigned'].batch
        return super().update(instance, validated_data)

class TaskListSerializer(serializers.ModelSerializer):
    user_id_assigned_by = UserInfoSerializer()
    user_id_assigned = UserInfoSerializer()
    updated_by = UserInfoSerializer()
    class Meta:
        model = Task
        fields = '__all__'
        depth = 2

class TaskShortInfoSerializer(serializers.ModelSerializer):
    from apps.communications.serializers import CheckCommunicationTaskSerializer
    task_communication = CheckCommunicationTaskSerializer()
    user_id_assigned_by = UserInfoSerializer()
    user_id_assigned = UserInfoSerializer()
    class Meta:
        model = Task
        fields = [
            'id',
            'status',
            'name',
            'type',
            'duration',
            'user_id_assigned_by',
            'user_id_assigned',
            'task_communication',
        ]

        depth = 0
        
class TaskFindSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'
        depth = 2

