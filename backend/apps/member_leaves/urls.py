from . import views
from django.urls import path

urlpatterns = [
    path('', views.MemberLeavesList.as_view(), name='leaves_list'),
    path('add/', views.MemberLeaveAdd.as_view(), name='add_leaves'),
    path('update/<int:pk>/', views.MemberLeaveUpdate.as_view(), name='update_leave'),

]
