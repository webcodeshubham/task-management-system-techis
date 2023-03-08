
from apps.users.serializers import UserInfoSerializer
from .models import MemberLeave
from rest_framework import serializers


class MemberLeaveSerializer(serializers.ModelSerializer):
    user = UserInfoSerializer()

    class Meta:
        model = MemberLeave
        fields = ['user','status', 'from_date', 'to_date','message']
        read_only_fields = ['user']

 
       
class MemberLeaveAddSerializer(serializers.ModelSerializer):
    user = UserInfoSerializer(required=False)

    class Meta:
        model = MemberLeave
        fields = ['user','status', 'from_date', 'to_date','message']

    def create(self, validated_data):
        validated_data['user'] = self.context['request'].login_user
        return super().create(validated_data)


class MemberLeaveListSerializer(serializers.ModelSerializer):
    user = UserInfoSerializer()
    class Meta:
        model = MemberLeave
        fields = '__all__'
        depth = 1
