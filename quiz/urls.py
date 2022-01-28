from django.urls import path, include
from rest_framework import routers
from .views import CreateQuizView, QuizViewSet

router = routers.DefaultRouter()
router.register('quizs', QuizViewSet, basename="quiz")
router.register('create_quiz', CreateQuizView, basename="create_quiz")
app_name = 'quiz'

urlpatterns = [
    path('', include(router.urls)),
]
