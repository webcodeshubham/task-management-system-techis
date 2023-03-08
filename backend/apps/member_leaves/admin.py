from django.contrib import admin
from .models import MemberLeave
# Register your models here.

@admin.register(MemberLeave)
class MemberLeaveModel(admin.ModelAdmin):
    fields = ['user','status','from_date','to_date','message']
    list_filter = ['user','status','from_date','to_date']
    list_display = fields
    search_fields = ['user__name','status','from_date','to_date']