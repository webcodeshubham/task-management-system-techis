from apps.users.serializers import UserInfoSerializer
from .models import LeaveConversation
from rest_framework import serializers

class LeaveConversationSerializer(serializers.ModelSerializer):
    class Meta:
        model = LeaveConversation
        fields = '__all__'
        depth = 1
class LeaveConversationListSerializer(serializers.ModelSerializer):
    class Meta:
        model = LeaveConversation
        fields = '__all__'
        depth = 1        

class LeaveConversationAddSerializer(serializers.ModelSerializer):
    user_id = UserInfoSerializer(required=False)

    class Meta:
        model = LeaveConversation
        fields = ['member_leave_id', 'user_id', 'message_body']

    def create(self, validated_data):
        validated_data['user_id'] = self.context['request'].login_user
        return super().create(validated_data)

class LeaveConversationupdateSerializer(serializers.ModelSerializer):

    user_id = UserInfoSerializer()

    class Meta:
        model = LeaveConversation
        fields = ['member_leave_id', 'user_id', 'message_body', 'updated_at']
        read_only_fields = ['user_id', 'member_leave_id']
        depth = 1


