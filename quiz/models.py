from django.db import models
from mongoengine import Document, fields, ReferenceField
from django.contrib.auth import get_user_model
User = get_user_model()


class Quiz(Document):
    name = fields.StringField(max_length=255)
    numOfQuestions = fields.IntField(default=10)
    binary = fields.BooleanField(default=True, editable=False)

    def __str__(self) -> str:
        return self.name


class Question(Document):
    quiz = ReferenceField(Quiz, on_delete=models.CASCADE)
    text = fields.StringField(max_length=255)

    def __str__(self) -> str:
        return f'{self.text}'


class Answer(Document):
    question = ReferenceField(Question, on_delete=models.CASCADE)
    text = fields.StringField(max_length=255)
    correct = fields.BooleanField(default=False)

    def __str__(self) -> str:
        return f'{self.text}'


class GuestResponse(Document):
    firstname = fields.StringField(max_length=255)
    lastname = fields.StringField(max_length=255)
    email = fields.StringField(max_length=255)
    quiz = ReferenceField(Quiz, on_delete=models.CASCADE)
    totalScore = fields.IntField()
    submitDate = fields.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f"{self.email} Response on {self.quiz.name}"
