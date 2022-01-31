from django.contrib import admin
from .models import Question, Answer, GuestResponse


@admin.register(Answer)
class AnswerAdmin(admin.ModelAdmin):
    list_display = ("id", "text", "correct")


@admin.register(GuestResponse)
class ResponseAdmin(admin.ModelAdmin):
    list_display = ("id", "email", "firstname", "lastname",
                    "totalScore", "submitDate")


admin.site.register(Question)
