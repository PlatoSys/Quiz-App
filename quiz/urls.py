from django.urls import path, include
from rest_framework import routers
from .views import (AdminQuestionView, GuestResponseView, AdminResponsesView,
                    QuestionsView)

router = routers.DefaultRouter()
router.register('questions', QuestionsView, basename="question")
router.register('responses', GuestResponseView, basename="response")
router.register('admin/responses', AdminResponsesView,
                basename="admin-responses")
router.register('admin/questions', AdminQuestionView,
                basename="admin-questions")

app_name = 'quiz'

urlpatterns = [
    path('', include(router.urls)),
]
