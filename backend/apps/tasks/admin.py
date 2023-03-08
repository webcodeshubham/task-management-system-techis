from asyncio import Task
from django.contrib import admin
from . models import Task
# Register your models here.

@admin.register(Task)
class TaskModel(admin.ModelAdmin):
    fields = ['user_id_assigned_by','user_id_assigned','status','name','batches', 'shifts','duration','note','student_support_type','session_topic']
    list_filter = ['status', 'type', 'student_support_type', ]
    list_display = fields
    search_fields = ['name','user_id_assigned_by','user_id_assigned']