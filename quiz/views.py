from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from rest_framework import mixins
from .serializers import QuizSerializer
from .models import Quiz
from rest_framework.permissions import IsAdminUser
from rest_framework.decorators import permission_classes


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
