from email.mime import base
from posixpath import basename
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from .views import QuizViewSet

router = routers.DefaultRouter()
router.register('quizs', QuizViewSet, basename="quiz")

app_name = 'quiz'

urlpatterns = [
    path('', include(router.urls)),
]
