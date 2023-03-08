from django.urls import path
from . import views
urlpatterns = [
    path('', views.LeaveList.as_view(), name='user_list'),
    path('<int:pk>/', views.LeaveFind.as_view(), name='leave_find'),
    path('update/<int:pk>/', views.LeaveUpdate.as_view(), name='user_update'),
    path('add/', views.AddLeave.as_view(), name='add_user'),
]