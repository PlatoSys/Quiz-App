from django.db import models


class Quiz(models.Model):
    name = models.CharField(max_length=255)
    numOfQuestions = models.IntegerField(default=10)
    binary = models.BooleanField(default=True)

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
