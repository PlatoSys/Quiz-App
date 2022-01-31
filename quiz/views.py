from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from rest_framework import mixins
from .serializers import (AnswerSerializer, QuizSerializer,
                          GuestResponseSerializer)
from .models import Answer, Quiz, GuestResponse, Question
from rest_framework.permissions import IsAdminUser
from rest_framework.decorators import permission_classes
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie
from copy import copy


class QuizViewSet(viewsets.ReadOnlyModelViewSet):
    """Quiz view for retrieving data"""

    def list(self, request):
        print(request.query_params, type(request.query_params.get('type')))
        params = request.query_params.get('type') or True
        quizes = Quiz.objects.filter(binary=params)
        serializer = QuizSerializer(quizes, many=True)
        print(params)
        for i in serializer.data:
            print(i['binary'])
            print('=======================')
        return Response(serializer.data, status=status.HTTP_200_OK)

    def retrieve(self, request, pk=None):
        quiz = Quiz.objects.get(pk=pk)
        serializer = QuizSerializer(quiz, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)


class GuestResponseView(viewsets.GenericViewSet, mixins.CreateModelMixin):
    """View for Checking answers and returning results"""
    serializer_class = GuestResponseSerializer

    @method_decorator(ensure_csrf_cookie)
    def create(self, request, *args, **kwargs):
        data = request.data
        answers = data['answers']
        result = {}
        totalScore = 0
        quiz = Quiz.objects.get(pk=data['quizId'])
        for each in answers:
            correctAnswer = (Answer.objects
                             .filter(question=each['question'])
                             .filter(correct=True).get())
            serializer = AnswerSerializer(correctAnswer, many=False)
            isRight = correctAnswer.id == each['id']
            totalScore = totalScore + 1 if isRight else totalScore
            result[each['question']] = {"result": isRight,
                                        "correctAnswer": serializer.data['id'],
                                        "userAnswer": each['id']}

        response = GuestResponse.objects.create(
            firstname=data['firstname'],
            lastname=data['lastname'],
            email=data['email'],
            totalScore=totalScore,
            quiz=quiz
        )
        serializer = GuestResponseSerializer(response)
        return Response({'answers': result, 'result': serializer.data},
                        status=status.HTTP_200_OK)


@permission_classes([IsAdminUser])
class CreateQuizView(viewsets.GenericViewSet, mixins.CreateModelMixin):
    """Quiz view for creating"""
    serializer_class = QuizSerializer

    def perform_create(self, serializer):
        quiz = serializer.save()
        for question in self.request.data['questions']:
            answers = copy(question['answers'])
            del question['answers']
            del question['id']
            question = Question(quiz=quiz, **question)
            question.save()
            for answer in answers:
                del answer['id']
                answer = Answer(question=question, **answer)
                answer.save()


@permission_classes([IsAdminUser])
class AdminResponsesView(viewsets.ReadOnlyModelViewSet):
    """Admin View For Responses"""
    serializer_class = GuestResponseSerializer
    queryset = GuestResponse.objects.all().order_by("-submitDate")
