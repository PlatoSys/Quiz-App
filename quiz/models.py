from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()


class Quiz(models.Model):
    name = models.CharField(max_length=255)
    numOfQuestions = models.IntegerField(default=10)
    binary = models.BooleanField(default=True, editable=False)

    def __str__(self) -> str:
        return self.name


class Question(models.Model):
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    text = models.CharField(max_length=255)

    def __str__(self) -> str:
        return f'{self.text}'


class Answer(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    text = models.CharField(max_length=255)
    correct = models.BooleanField(default=False)

    def __str__(self) -> str:
        return f'{self.text}'


class GuestResponse(models.Model):
    # user = models.ForeignKey(User, on_delete=models.CASCADE)
    firstname = models.CharField(max_length=255)
    lastname = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    totalScore = models.IntegerField()
    submitDate = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f"{self.email} Response on {self.quiz.name}"
