from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from rest_framework import mixins
from .serializers import (AnswerSerializer, QuizSerializer,
                          GuestResponseSerializer)
from .models import Answer, Quiz, GuestResponse
from rest_framework.permissions import IsAdminUser
from rest_framework.decorators import permission_classes, api_view


class QuizViewSet(viewsets.ReadOnlyModelViewSet):
    """Quiz view for retrieving data"""

    def list(self, request):
        params = request.query_params.get('type') or True
        quizes = Quiz.objects.filter(binary=params)
        serializer = QuizSerializer(quizes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def retrieve(self, request, pk=None):
        quiz = Quiz.objects.get(pk=pk)
        serializer = QuizSerializer(quiz, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)


@permission_classes([IsAdminUser])
class CreateQuizView(viewsets.GenericViewSet, mixins.CreateModelMixin):
    """Quiz view for creating"""
    serializer_class = QuizSerializer


class GuestResponseView(viewsets.GenericViewSet, mixins.CreateModelMixin,
                        mixins.ListModelMixin):
    """View for Checking answers and returning results"""
    serializer_class = GuestResponseSerializer
    
    def create(self, request, *args, **kwargs):
        answers = request.data['answers']
        result = {}
        totalScore = 0
        quiz = Quiz.objects.get(pk=request.data['quizId'])
        for each in answers:
            correctAnswer = (Answer.objects
                             .filter(question__pk=each['questionId'])
                             .filter(correct=True).get())
            serializer = AnswerSerializer(correctAnswer, many=False)
            correctAnswerId = serializer.data['id']
            isRight = correctAnswerId == each['answerId']
            totalScore = totalScore + 1 if isRight else totalScore
            result[each['questionId']] = {"result": isRight,
                                          "correct": correctAnswerId}

        response = GuestResponse.objects.create(
            firstname=request.data['firstname'],
            lastname=request.data['lastname'],
            email=request.data['email'],
            totalScore=totalScore,
            quiz=quiz
        )
        serializer = GuestResponseSerializer(response)
        return Response({'answers': result, 'result': serializer.data},
                        status=status.HTTP_200_OK)


@api_view(['POST', 'GET'])
def GuestResponseCheck(request):
    answers = request.data['answers']
    result = {}
    totalScore = 0
    quiz = Quiz.objects.get(pk=request.data['quizId'])
    for each in answers:
        correctAnswer = (Answer.objects
                         .filter(question__pk=each['questionId'])
                         .filter(correct=True).get())
        serializer = AnswerSerializer(correctAnswer, many=False)
        correctAnswerId = serializer.data['id']
        isRight = correctAnswerId == each['answerId']
        totalScore = totalScore + 1 if isRight else totalScore
        result[each['questionId']] = {"result": isRight,
                                      "correct": correctAnswerId}

    response = GuestResponse.objects.create(
        firstname=request.data['firstname'],
        lastname=request.data['lastname'],
        email=request.data['email'],
        totalScore=totalScore,
        quiz=quiz
    )
    serializer = GuestResponseSerializer(response)
    return Response({'answers': result, 'result': serializer.data},
                    status=status.HTTP_200_OK)
