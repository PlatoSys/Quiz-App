from django.urls import path, include
from rest_framework import routers
from .views import (CreateQuizView, QuizViewSet, GuestResponseView,
                    AdminResponsesView)

router = routers.DefaultRouter()
router.register('quizs', QuizViewSet, basename="quiz")
router.register('create_quiz', CreateQuizView, basename="create_quiz")
router.register('responses', GuestResponseView, basename="response")
router.register('admin/responses', AdminResponsesView,
                basename="admin-responses")

app_name = 'quiz'

urlpatterns = [
    path('', include(router.urls)),
]
