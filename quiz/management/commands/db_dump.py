import random

import faker.providers
from django.core.management.base import BaseCommand
from faker import Faker
from quiz.models import Quiz, Question, Answer

QUESTIONS = [f"Dump Question {i}" for i in range(1, 100)]
ANSWERS = [f"Dump Answer {i}" for i in range(1, 100)]


class Provider(faker.providers.BaseProvider):
    def quiz_questions(self):
        return self.random_element(QUESTIONS)

    def quiz_answers(self):
        return self.random_element(ANSWERS)


class Command(BaseCommand):
    help = "Command information"

    def handle(self, *args, **kwargs):

        fake = Faker()
        fake.add_provider(Provider)

        # Binary Quiz
        quiz = Quiz.objects.create(name="Binary Quiz 1")
        for _ in range(10):
            question_text = fake.unique.quiz_questions()
            question = Question.objects.create(quiz=quiz, text=question_text)

            ans1 = fake.unique.quiz_answers()
            ans2 = fake.unique.quiz_answers()
            ans1_bool = bool(random.getrandbits(1))
            ans2_bool = not ans1_bool
            Answer.objects.create(question=question, correct=ans1_bool,
                                  text=f"{ans1} - {ans1_bool}",)
            Answer.objects.create(question=question, correct=ans2_bool,
                                  text=f"{ans2} - {ans2_bool}")

        # Multiple choice Quiz
        quiz = Quiz.objects.create(name="Multiple Choice Quiz 1", binary=False)
        for _ in range(10):
            question_text = fake.unique.quiz_questions()
            question = Question.objects.create(quiz=quiz, text=question_text)

            ans1 = fake.unique.quiz_answers()
            ans2 = fake.unique.quiz_answers()
            ans3 = fake.unique.quiz_answers()
            booleans = [True, False, False]
            random.shuffle(booleans)
            Answer.objects.create(question=question, correct=booleans[0],
                                  text=f"{ans1} - {booleans[0]}",)
            Answer.objects.create(question=question, correct=booleans[1],
                                  text=f"{ans2} - {booleans[1]}")
            Answer.objects.create(question=question, correct=booleans[2],
                                  text=f"{ans3} - {booleans[2]}")
        self.stdout.write("Number of categories: 10")
