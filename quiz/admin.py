from django.contrib import admin
from .models import Quiz, Question, Answer, GuestResponse


# @admin.register(Quiz)
# class QuizAdmin(admin.ModelAdmin):
#     list_display = ("id", "name", "numOfQuestions", "binary")


# @admin.register(Answer)
# class AnswerAdmin(admin.ModelAdmin):
#     list_display = ("id", "text", "correct")


# @admin.register(GuestResponse)
# class ResponseAdmin(admin.ModelAdmin):
#     list_display = ("id", "email", "firstname", "lastname", "quiz",
#                     "totalScore", "submitDate")


# admin.site.register(Question)
admin.register(Question)