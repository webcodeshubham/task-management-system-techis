from django.urls import path
from . import views
urlpatterns = [
    path('', views.TaskList.as_view(), name='user_list'),
    path('<int:pk>/', views.TaskFind.as_view(), name='task_find'),
    path('update/<int:pk>/', views.TaskUpdate.as_view(), name='user_update'),
    path('add/', views.AddTask.as_view(), name='add_user'),
    path('check_communication/<int:pk>/',views.CheckCommunication.as_view(),name='check_communication')
]
