from django.urls import path
from . import views
urlpatterns = [
    path('', views.TargetList.as_view(), name='user_list'),
    path('<int:pk>/', views.TargetFind.as_view(), name='target_find'),
    path('update/<int:pk>/', views.TargetUpdate.as_view(), name='user_update'),
    path('add/', views.AddTarget.as_view(), name='add_user'),
]
