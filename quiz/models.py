from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()


class Question(models.Model):
    text = models.CharField(max_length=255)
    binary = models.BooleanField(default=True)

    def __str__(self) -> str:
        return f'{self.text}'


class Answer(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    text = models.CharField(max_length=255)
    correct = models.BooleanField(default=False)

    def __str__(self) -> str:
        return f'{self.text}'


class GuestResponse(models.Model):
    firstname = models.CharField(max_length=255)
    lastname = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    totalScore = models.IntegerField()
    totalQuestion = models.IntegerField()
    submitDate = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f"{self.email} Response on {self.id}"
