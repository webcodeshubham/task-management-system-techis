from django.urls import path
from .import views

urlpatterns = [
    path('',views.CommunicationScoreList.as_view(),name ='communication_score_list'),
    path('update/<int:pk>/',views.CommunicationScoreUpdate.as_view(),name = 'communication_score_update'),
    path('add/<int:pk>/',views.AddCommunicationScore.as_view(),name ='add_communication_score')
]