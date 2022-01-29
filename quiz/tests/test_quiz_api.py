"""Test Quiz API"""
from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from ..models import Answer, Question, Quiz
from django.contrib.auth import get_user_model
User = get_user_model()

CREATE_QUIZ_URL = reverse('quiz:create_quiz-list')
RETRIEVE_QUIZ_URL = reverse('quiz:quiz-list')
PAYLOAD = {
    'name': 'TestQuiz'
}


def create_superuser():
    return User.objects.create_superuser(
        'AdminUser',
        'admin@email.com',
        'adminpass'
    )


class Admin(TestCase):
    """Test Quiz Creation"""

    def setUp(self):
        self.client = APIClient()
        self.user = create_superuser()
        self.client.force_authenticate(user=self.user)

    def create_quiz(self):
        """Create Default Quiz"""
        return Quiz.objects.create(name="TestQuiz")

    def create_question(self, quiz, text="TestQuestion"):
        """Create Default Question"""
        return Question.objects.create(quiz=quiz, text=text)

    def create_answer(self, question, text="TestQuestion"):
        """Create Default Answer"""
        return Answer.objects.create(question=question, text=text)

    def test_create_quiz(self):
        """Test for Creating quiz"""
        res = self.client.post(CREATE_QUIZ_URL, PAYLOAD)
        data = res.data

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)

        self.assertEqual(data['name'], PAYLOAD['name'])
        self.assertEqual(len(data['questions']), 0)
        self.assertEqual(data['numOfQuestions'], 10)
        self.assertTrue(data['binary'])

    def test_question_adding(self):
        """Test Questions adding to quiz"""
        quiz = self.create_quiz()
        self.create_question(quiz, "Question1")
        self.create_question(quiz, "Question2")

        res = self.client.get(RETRIEVE_QUIZ_URL)
        data = res.data
        self.assertEqual(len(data), 1)
        self.assertEqual(len(data[0]['questions']), 2)

    def test_answer_adding(self):
        """Test Questions adding to quiz"""
        quiz = self.create_quiz()
        question1 = self.create_question(quiz, "Question1")
        self.create_answer(question1, True)
        self.create_answer(question1, False)

        res = self.client.get(RETRIEVE_QUIZ_URL)
        data = res.data
        self.assertEqual(len(data), 1)
        self.assertEqual(len(data[0]['questions']), 1)
        self.assertEqual(len(data[0]['questions'][0]['answers']), 2)
