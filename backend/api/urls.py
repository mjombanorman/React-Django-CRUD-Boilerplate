from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProjectViewSet,ProjectManagerViewSet

router = DefaultRouter()

router.register('project', ProjectViewSet,basename='project')
router.register('project_manager', ProjectManagerViewSet,basename='project_manager')
urlpatterns = router.urls
