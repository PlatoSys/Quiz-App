"""Test Quiz API"""
from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from ..models import Answer, Question, Quiz
from django.contrib.auth import get_user_model
User = get_user_model()

CREATE_QUIZ_URL = reverse("quiz:create_quiz-list")
RETRIEVE_QUIZ_URL = reverse("quiz:quiz-list")
RESPONSE_URL = reverse("quiz:response-list")

PAYLOAD = {
    "name": "TestQuiz",
    "numOfQuestions": 1,
    "binary": "True",
    "questions": [{
        "id": 1,
        "text": "Question 1",
        "answers": [
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
    }]
}
response_dict = {
    "quizId": 1,
    "firstname": "Test",
    "lastname": "Test",
    "email": "Test",
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


class Admin(TestCase):
    """Test Quiz Creation"""

    def setUp(self):
        self.client = APIClient()
        self.user = create_superuser()
        self.client.force_authenticate(user=self.user)

    def create_quiz(self, questionNum=10):
        """Create Default Quiz"""
        return Quiz.objects.create(name="TestQuiz", numOfQuestions=questionNum)

    def create_question(self, quiz, text="TestQuestion"):
        """Create Default Question"""
        return Question.objects.create(quiz=quiz, text=text)

    def create_answer(self, question, text="TestQuestion", correct=False):
        """Create Default Answer"""
        return Answer.objects.create(question=question, text=text,
                                     correct=correct)

    def test_create_quiz(self):
        """Test for Creating quiz"""
        self.create_quiz()

        self.assertEqual(len(Quiz.objects.all()), 1)

    def test_create_quiz_using_post(self):
        """Test create Quiz using Post"""
        response = str(PAYLOAD).replace("'", "\"")
        res = self.client.post(CREATE_QUIZ_URL, response,
                               content_type="application/json")

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)

        questions = res.data['questions']

        self.assertEqual(len(questions), 1)
        first_question = questions[0]
        payload_question = PAYLOAD['questions'][0]
        self.assertEqual(first_question['text'], payload_question['text'])

        answers = first_question['answers']
        payload_answers = payload_question['answers']
        for postAnswer, payloadAnswer in zip(answers, payload_answers):
            self.assertEqual(postAnswer['text'], payloadAnswer['text'])

    def test_question_adding(self):
        """Test Questions adding to quiz"""
        quiz = self.create_quiz()
        self.create_question(quiz, "Question1")
        self.create_question(quiz, "Question2")

        res = self.client.get(RETRIEVE_QUIZ_URL)
        data = res.data
        self.assertEqual(len(data), 1)
        self.assertEqual(len(data[0]["questions"]), 2)

    def test_answer_adding(self):
        """Test Questions adding to quiz"""
        quiz = self.create_quiz()
        question1 = self.create_question(quiz, "Question1")
        self.create_answer(question1, True)
        self.create_answer(question1, False)

        res = self.client.get(RETRIEVE_QUIZ_URL)
        data = res.data
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(data), 1)
        self.assertEqual(len(data[0]["questions"]), 1)
        self.assertEqual(len(data[0]["questions"][0]["answers"]), 2)

    def test_check_right_response(self):
        """Test check Response"""
        quiz = self.create_quiz(questionNum=1)
        question1 = self.create_question(quiz, "Question1")

        self.create_answer(question1, correct=True)
        self.create_answer(question1, correct=False)

        response = str(response_dict).replace("'", "\"")
        res = self.client.post(RESPONSE_URL, response,
                               content_type="application/json")

        result = res.data['result']
        answers = res.data['answers']
        self.assertEqual(result['totalScore'], 1)
        self.assertEqual(result['total_qty'], 1)
        self.assertEqual(result['firstname'], response_dict['firstname'])
        self.assertEqual(result['lastname'], response_dict['lastname'])
        self.assertEqual(result['email'], response_dict['email'])

        self.assertEqual(len(answers), 1)
        for answer in answers.values():
            self.assertTrue(answer['result'])
            self.assertEqual(answer['correctAnswer'], answer['userAnswer'])

    def test_check_wrong_response(self):
        """Test check Response wrong answer"""
        quiz = self.create_quiz(questionNum=1)
        question1 = self.create_question(quiz, "Question1")

        self.create_answer(question1, correct=True)
        self.create_answer(question1, correct=False)

        response_dict = {
            "quizId": 1,
            "firstname": "Test",
            "lastname": "Test",
            "email": "Test",
            "answers": [
                    {
                        "questionId": 1,
                        "answerId": 2
                    }
                ]
        }
        response = str(response_dict).replace("'", "\"")
        res = self.client.post(RESPONSE_URL, response,
                               content_type="application/json")

        result = res.data['result']
        answers = res.data['answers']
        self.assertEqual(result['totalScore'], 0)
        self.assertEqual(result['total_qty'], 1)

        self.assertEqual(len(answers), 1)
        for answer in answers.values():
            self.assertFalse(answer['result'])
            self.assertNotEqual(answer['correctAnswer'],
                                answer['userAnswer'])

    def test_post_quiz_and_response(self):
        """Test create Quiz using Post and check response using post"""
        response = str(PAYLOAD).replace("'", "\"")
        res = self.client.post(CREATE_QUIZ_URL, response,
                               content_type="application/json")

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)

        guestResponse = str(response_dict).replace("'", "\"")
        guestRes = self.client.post(RESPONSE_URL, guestResponse,
                                    content_type="application/json")

        self.assertEqual(guestRes.status_code, status.HTTP_200_OK)

        postAnswer = res.data['questions'][0]['answers']
        guestAnswer = guestRes.data['answers']

        self.assertNotEqual(len(postAnswer), len(guestAnswer))
        for answer in guestAnswer.values():
            self.assertEqual(answer['correctAnswer'], postAnswer[0]['id'])
