"""Test Quiz API"""
from copy import copy
from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from ..serializers import QuestionSerializer
from ..models import Answer, Question
from django.contrib.auth import get_user_model
User = get_user_model()

QUESTION_URL = reverse("quiz:admin-questions-list")
RESPONSE_URL = reverse("quiz:response-list")
ADMIN_RESPONSES_URL = reverse("quiz:admin-responses-list")

QUESTION_PAYLOAD = {
    "text": "Question 1",
    "binary": "True",
    "possibleAnswers": [
            {
                "id": 1,
                "text": "answer1 True",
                "correct": "True"
            },
            {
                "id": 2,
                "text": "answer2",
                "correct": "False"
            }
    ]
}

response_dict = {
    "firstname": "Test",
    "lastname": "Test",
    "email": "Test",
    "numOfQuestions": 1,
    "answers": [
            {
                "questionId": 1,
                "answerId": 1
            }
        ]
}


def create_superuser():
    return User.objects.create_superuser(
        "AdminUser",
        "admin@email.com",
        "adminpass"
    )


class TestQuizAPI(TestCase):
    """Test Quiz Creation"""

    def setUp(self):
        self.client = APIClient()

    def create_question(self, text="TestQuestion"):
        """Create Default Question"""
        return Question.objects.create(text=text)

    def create_answer(self, question, text="TestQuestion", correct=False):
        """Create Default Answer"""
        return Answer.objects.create(question=question, text=text,
                                     correct=correct)

    def test_create_question(self):
        """Test for Creating quiz"""
        self.create_question("TestQuestion")
        self.assertEqual(len(Question.objects.all()), 1)
        first = Question.objects.first()
        self.assertEqual(first.text, "TestQuestion")

    def test_create_answer(self):
        """Test create Answers"""
        question = self.create_question()
        self.create_answer(question=question, text="A1", correct=False)
        self.create_answer(question=question, text="A2", correct=True)

        answers = Answer.objects.all()

        self.assertNotEqual(answers[0].correct, answers[1].correct)

    def test_check_right_response(self):
        """Test check Response"""
        question1 = self.create_question("Question1")
        self.create_answer(question1, correct=True)
        self.create_answer(question1, correct=False)

        request = str(response_dict).replace("'", "\"")
        res = self.client.post(RESPONSE_URL, request,
                               content_type="application/json")

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        result = res.data['result']
        answers = res.data['answers']
        for answer in answers.values():
            self.assertTrue(answer['result'])
            self.assertEqual(answer['correctAnswer'], answer['userAnswer'])
        self.assertEqual(result['totalScore'], 1)
        self.assertEqual(result['totalQuestion'], 1)
        self.assertEqual(result['firstname'], response_dict['firstname'])
        self.assertEqual(result['lastname'], response_dict['lastname'])
        self.assertEqual(result['email'], response_dict['email'])

        self.assertEqual(len(answers), 1)

    def test_check_wrong_response(self):
        """Test check Response wrong answer"""
        question1 = self.create_question("Question1")
        self.create_answer(question1, correct=False)
        self.create_answer(question1, correct=True)

        request = str(response_dict).replace("'", "\"")
        res = self.client.post(RESPONSE_URL, request,
                               content_type="application/json")

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        result = res.data['result']
        answers = res.data['answers']

        for answer in answers.values():
            self.assertFalse(answer['result'])
            self.assertNotEqual(answer['correctAnswer'], answer['userAnswer'])
        self.assertEqual(result['totalScore'], 0)
        self.assertEqual(result['totalQuestion'], 1)
        self.assertEqual(result['firstname'], response_dict['firstname'])
        self.assertEqual(result['lastname'], response_dict['lastname'])
        self.assertEqual(result['email'], response_dict['email'])

    def test_check_guest_permission(self):
        """Check Guests permission"""
        request = str(QUESTION_PAYLOAD).replace("'", "\"")
        res = self.client.post(QUESTION_URL, request,
                               content_type="application/json")

        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


class TestAdminActions(TestCase):
    """Test Admin Actions"""

    def setUp(self):
        self.client = APIClient()
        self.user = create_superuser()
        self.client.force_authenticate(user=self.user)

    def create_question(self, text="TestQuestion", binary=True):
        """Create Default Question"""
        return Question.objects.create(text=text, binary=binary)

    def create_answer(self, question, text="TestQuestion", correct=False):
        """Create Default Answer"""
        return Answer.objects.create(question=question, text=text,
                                     correct=correct)

    def test_create_question_request(self):
        """Create Question using request"""
        request = str(QUESTION_PAYLOAD).replace("'", "\"")
        res = self.client.post(QUESTION_URL, request,
                               content_type="application/json")

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        data = res.data
        self.assertTrue(data['binary'])
        self.assertEqual(len(data['answers']), 2)

        localAnswers = Answer.objects.all()
        for localAns, resAns in zip(localAnswers,
                                    QUESTION_PAYLOAD['possibleAnswers']):
            self.assertEqual(localAns.text, resAns['text'])
            self.assertEqual(str(localAns.correct), resAns['correct'])

    def test_responses_view(self):
        """Test Responses"""
        # Create Question
        request = str(QUESTION_PAYLOAD).replace("'", "\"")
        res = self.client.post(QUESTION_URL, request,
                               content_type="application/json")

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)

        # Create Response
        request = str(response_dict).replace("'", "\"")
        res = self.client.post(RESPONSE_URL, request,
                               content_type="application/json")

        self.assertEqual(res.status_code, status.HTTP_200_OK)

        # Get Response
        res = self.client.get(ADMIN_RESPONSES_URL)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data), 1)
        first_response = res.data[0]

        self.assertEqual(first_response['firstname'],
                         response_dict['firstname'])
        self.assertEqual(first_response['lastname'], response_dict['lastname'])
        self.assertEqual(first_response['email'], response_dict['email'])
        self.assertEqual(first_response['totalScore'], 1)
        self.assertEqual(first_response['totalQuestion'], 1)

    def test_add_multi_choice_question(self):
        """Add Multi Choice Test"""
        question = self.create_question("TextQuestion1", False)
        self.create_answer(question=question, correct=True)
        self.create_answer(question=question, correct=False)
        self.create_answer(question=question, correct=False)

        question2 = self.create_question("TextQuestion2", False)
        self.create_answer(question=question2, correct=True)
        self.create_answer(question=question2, correct=False)
        self.create_answer(question=question2, correct=False)

        all_question = Question.objects.all()
        self.assertEqual(len(all_question), 2)
        serializer = QuestionSerializer(all_question, many=True)
        for question in serializer.data:
            self.assertEqual(len(question['answers']), 3)

    def test_add_multi_choice_question_post(self):
        """Check Post Multi choice question"""
        request = copy(QUESTION_PAYLOAD)
        request['binary'] = "False"
        request = str(request).replace("'", "\"")
        res = self.client.post(QUESTION_URL, request,
                               content_type="application/json")

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertFalse(res.data['binary'])
