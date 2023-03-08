
from asyncio import Task
from django.contrib import admin
from . models import Target
# Register your models here.

@admin.register(Target)
class TargetModel(admin.ModelAdmin):
    fields = ['user_id', 'status', 'type', 'target_number', 'project_start_date', 'project_due_date', 'project_name', 'project_student_name', 'note']
    list_filter = []
    list_display = fields
    search_fields = ['type', 'cohort', 'project_start_date', 'project_due_date', 'project_students_name']