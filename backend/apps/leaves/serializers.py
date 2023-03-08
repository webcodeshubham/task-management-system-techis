from ast import Or
from apps.users.serializers import UserInfoSerializer
from .models import Leave
from ..users .models import User
from rest_framework import serializers

class LeaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Leave
        fields = '__all__'
class AddLeaveSerializer(serializers.ModelSerializer):
    class Meta:  
        model = Leave
        fields = [
            'user_name',
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

class LeaveUpdateSerializer(serializers.ModelSerializer): 
    class Meta:  
        model = Leave
        fields = [
            'user_name',
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
        
class LeaveListSerializer(serializers.ModelSerializer):
    # employee_ids = UserInfoSerializer()
    user_name = UserInfoSerializer()
    
    class Meta:
        model = Leave
        fields = [
            'user_name',
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
   
class LeaveFindSerializer(serializers.ModelSerializer):
    class Meta:
        model = Leave
        fields = '__all__'

