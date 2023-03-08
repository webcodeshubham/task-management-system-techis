from .import views
from django.urls import path

urlpatterns = [
    path('', views.LeaveConversationList.as_view(),
         name='leave_conversation_list'),
    path('add/', views.LeaveConversationAdd.as_view(),
         name='add_leave_conversation'),
    path('update/<int:pk>/', views.LeaveConversationUpdate.as_view(),
         name='update_leave_conversation'),
    path('delete/<int:pk>/', views.LeaveConversationDelete.as_view(),
         name='delete_conversation')

]
