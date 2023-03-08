from django.utils import timezone
from apps.users.serializers import UserInfoSerializer, UserOptionSerializer
from .models import Target
from rest_framework import serializers

class TargetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Target
        fields = '__all__'
    def post(self, request, *args, **kwargs):
        request.data['created_by'] = request.login_user.id
        return super().create(request, *args, **kwargs)

class TargetListSerializer(serializers.ModelSerializer):
    updated_by = UserInfoSerializer(required=False)
    created_by = UserInfoSerializer(required=False)
    class Meta:
        model = Target
        fields = '__all__'
        depth = 1
        
class TargetUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Target
        fields = [
            'id',
            'user_id',
            'status',
            'type',
            'target_number',
            'cohort',
            'project_start_date',
            'project_due_date',
            'project_name',
            'project_github_link',
            'project_student_name',
            'note'
        ]
    def update(self, instance, validated_data):
        validated_data['updated_by'] = self.context['request'].login_user
        validated_data['updated_at'] = timezone.now()
        return super().update(instance, validated_data)
        
