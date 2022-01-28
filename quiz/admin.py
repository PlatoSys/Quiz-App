from django.contrib import admin
from .models import Quiz, Question, Answer


@admin.register(Quiz)
class QuizAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "numOfQuestions", "binary")


admin.site.register(Question)
admin.site.register(Answer)
