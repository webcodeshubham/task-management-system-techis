
from django.contrib import admin
from .models import LeaveConversation
# Register your models here.

@admin.register(LeaveConversation)
class LeaveConversationModel(admin.ModelAdmin):
    fields = ['member_leave_id','user_id','message_body']
    list_filter = ['member_leave_id', 'user_id', 'message_body']
    list_display = fields
    search_fields = [ 'user_id__name', 'member_leave_id']
