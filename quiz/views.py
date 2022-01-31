from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from rest_framework import mixins
from .serializers import (AnswerSerializer, GuestResponseSerializer,
                          QuestionSerializer)
from .models import Answer, GuestResponse, Question
from rest_framework.permissions import IsAdminUser
from rest_framework.decorators import permission_classes
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie


class GuestResponseView(viewsets.GenericViewSet, mixins.CreateModelMixin):
    """View for Checking answers and returning results"""
    serializer_class = GuestResponseSerializer

    @method_decorator(ensure_csrf_cookie)
    def create(self, request, *args, **kwargs):
        data = request.data
        answers = data['answers']
        result = {}
        totalScore = 0
        for each in answers:
            correctAnswer = (Answer.objects
                             .filter(question__pk=each['questionId'])
                             .filter(correct=True).get())
            serializer = AnswerSerializer(correctAnswer, many=False)
            isRight = correctAnswer.id == each['answerId']
            totalScore = totalScore + 1 if isRight else totalScore
            result[each['questionId']] = {"result": isRight,
                                          "correctAnswer": correctAnswer.id,
                                          "userAnswer": each['answerId']}

        response = GuestResponse.objects.create(
            firstname=data['firstname'],
            lastname=data['lastname'],
            email=data['email'],
            totalScore=totalScore,
            totalQuestion=data['numOfQuestions']
        )
        serializer = GuestResponseSerializer(response)
        return Response({'answers': result, 'result': serializer.data},
                        status=status.HTTP_200_OK)


class QuestionsView(viewsets.GenericViewSet, mixins.ListModelMixin):
    """Questions view"""

    def list(self, request):
        binary = request.query_params.get('binary')
        questionNum = request.query_params.get('numOfQuestions')
        questionNum = int(questionNum) if questionNum else 10
        binary = True if not binary else binary.lower() == "true"
        questions = (Question.objects
                     .filter(binary=binary).order_by('?')[:questionNum])
        serializer = QuestionSerializer(questions, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


@permission_classes([IsAdminUser])
class AdminQuestionView(viewsets.GenericViewSet, mixins.CreateModelMixin):
    """Quiz view for creating"""
    serializer_class = QuestionSerializer

    def create(self, request, *args, **kwargs):
        serializer = QuestionSerializer(data=request.data)
        serializer.is_valid()
        question = serializer.save()

        for answer in request.data['possibleAnswers']:
            Answer.objects.create(
                question=question,
                text=answer['text'],
                correct=answer['correct']
            )

        return Response(serializer.data, status=status.HTTP_201_CREATED)


@permission_classes([IsAdminUser])
class AdminResponsesView(viewsets.ReadOnlyModelViewSet):
    """Admin View For Responses"""
    serializer_class = GuestResponseSerializer
    queryset = GuestResponse.objects.all().order_by("-submitDate")
