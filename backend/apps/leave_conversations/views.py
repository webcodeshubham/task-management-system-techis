import datetime
from rest_framework.response import Response
from apps.member_leaves.models import MemberLeave
from apps.member_leaves import serializers
from .models import LeaveConversation
from apps.users.mixins import CustomLoginRequiredMixin
from rest_framework import generics
from .serializers import LeaveConversationAddSerializer, LeaveConversationSerializer, LeaveConversationListSerializer, LeaveConversationupdateSerializer
from rest_framework import serializers
# Create your views here.


class LeaveConversationList(CustomLoginRequiredMixin, generics.ListAPIView):
    queryset = LeaveConversation.objects.all()
    serializer_class = LeaveConversationListSerializer

    def get(self, request, *args, **kwargs):
        self.queryset = LeaveConversation.objects.filter(
            member_leave_id=request.login_user.id).order_by('-id')
        return self.list(request, *args, **kwargs)


class LeaveConversationUpdate(CustomLoginRequiredMixin, generics.RetrieveAPIView, generics.UpdateAPIView):
    queryset = LeaveConversation.objects.all()
    serializer_class = LeaveConversationupdateSerializer

    def put(self, request, pk, format=None):
        leave_conversation = self.get_object()
        leave_conversation.message_body = request.data['message_body']
        leave_conversation.updated_at = datetime.datetime.now()
        leave_conversation.save()
        serializer = LeaveConversationupdateSerializer(
            [leave_conversation], many=True)
        return Response(serializer.data)


class LeaveConversationAdd(CustomLoginRequiredMixin, generics.CreateAPIView):
    queryset = LeaveConversation.objects.all()
    serializer_class = LeaveConversationAddSerializer


class LeaveConversationDelete(CustomLoginRequiredMixin,generics.RetrieveAPIView ,generics.DestroyAPIView):
    queryset = LeaveConversation.objects.all()
    serializer_class = LeaveConversationSerializer

    def delete(self, request, *args, **kwargs):
        leave_conversation = LeaveConversation.objects.get(
            pk=self.kwargs['pk'])
        if leave_conversation.user_id.id != request.login_user.id:
            raise serializers.ValidationError(
                {"error": "You can't delete the conversation"})

        return self.destroy(request, *args, **kwargs)
