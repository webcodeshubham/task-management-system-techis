from django.urls import path
from .import views

urlpatterns = [
    path('',views.CommunicationFieldList.as_view(),name = 'field_list'),
    path('update/<int:pk>/',views.CommunicationFieldUpdate.as_view(),name = 'field_update'),
    path('add/',views.AddCommunicationField.as_view(), name='add_field')
]