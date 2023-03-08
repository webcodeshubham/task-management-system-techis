from apps.tasks.models import Task
from .models import Communication
from rest_framework import serializers
from apps.users.serializers import UserInfoSerializer
from apps.communication_scores.serializers import CommunicationScoreSerializer
from apps.communication_fields.models import CommunicationField
from apps.communication_scores.models import CommunicationScore


class CommunicationListTaskSerializer(serializers.ModelSerializer):
    user_id_assigned_by = UserInfoSerializer()
    user_id_assigned = UserInfoSerializer()

    class Meta:
        model = Task
        fields = '__all__'
        depth = 1


class CommunicationListSerializer(serializers.ModelSerializer):
    reviewed_by = UserInfoSerializer()
    task = CommunicationListTaskSerializer()

    class Meta:
        model = Communication
        fields = '__all__'
        depth = 2


class CommunicationSerializer(serializers.ModelSerializer):
    reviewed_by = UserInfoSerializer()
    # user_id_assigned_by = UserInfoSerializer()
    # task = TaskListSerializer()

    class Meta:
        model = Communication
        fields = '__all__'
        depth = 1

    def create(self, validated_data):
        data = validated_data
        communication = Communication.objects.create(**data)
        communication_fields = CommunicationField.objects.all()

        # create CommunicationScores
        for field in communication_fields:
            CommunicationScore.objects.create(
                communication=communication, communication_field=field)
        return communication


class CommunicationTaskSerializer(serializers.ModelSerializer):
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
            'session_student_name',
            
            'user_id_assigned_by',
            'user_id_assigned',
        ]
        depth = 1


class CommunicationFindSerializer(serializers.ModelSerializer):
    communication_scores = CommunicationScoreSerializer(many=True)
    reviewed_by = UserInfoSerializer()
    task = CommunicationTaskSerializer()

    class Meta:
        model = Communication
        fields = [
            'id',
            'error_total',
            'general_total',
            'critical_total',
            'reviewed_by',
            'task',
            'communication_scores'
        ]
        depth = 1


class CommunicationUpdateSerializer(serializers.ModelSerializer):
    communication_scores = CommunicationScoreSerializer(many=True)
    reviewed_by = UserInfoSerializer()

    class Meta:
        model = Communication
        fields = [
            'id',
            'error_total',
            'general_total',
            'critical_total',
            'reviewed_by',
            'task',
            'communication_scores',
        ]
        depth = 1


class CheckCommunicationTaskSerializer(serializers.ModelSerializer):
    reviewed_by = UserInfoSerializer()
    communication_scores = CommunicationScoreSerializer(many=True)

    class Meta:
        model = Communication
        fields = [
            'id',
            'critical_total',
            'general_total',
            'error_total',
            'reviewed_by',
            'date_reviewed',
            'communication_scores'

        ]
        depth = 1
