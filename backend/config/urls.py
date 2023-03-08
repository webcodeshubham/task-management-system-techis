"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('users/', include('apps.users.urls')),
    path('tasks/', include('apps.tasks.urls')),
    path('targets/', include('apps.targets.urls')),
    path('leaves/', include('apps.leaves.urls')),
    path('member_leaves/', include('apps.member_leaves.urls')),
    path('leave_conversations/', include('apps.leave_conversations.urls')),
    path('communications/', include('apps.communications.urls')),
    path('communication_fields/', include('apps.communication_fields.urls')),
    path('communication_scores/', include('apps.communication_scores.urls')),

]
