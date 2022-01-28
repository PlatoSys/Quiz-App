from rest_framework import viewsets
from rest_framework.response import Response

from quiz.serializers import QuizSerializer
from rest_framework import status
from .models import Quiz

class QuizViewSet(viewsets.ReadOnlyModelViewSet):
    """Quiz view for creating and retrieving"""

    def list(self, request):
        params = request.query_params.get('type') or True
        quizes = Quiz.objects.filter(binary=params)
        serializer = QuizSerializer(quizes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def retrieve(self, request, pk=None):
        quiz = Quiz.objects.get(pk=pk)
        serializer = QuizSerializer(quiz, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)
