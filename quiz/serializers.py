from rest_framework import serializers
from .models import Answer, Question, Quiz, GuestResponse
from rest_framework_mongoengine.serializers import DocumentSerializer


class AnswerSerializer(DocumentSerializer):

    class Meta:
        model = Answer
        fields = '__all__'
        extra_kwargs = {'correct': {'write_only': True}}


class QuestionSerializer(DocumentSerializer):
    answers = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Question
        fields = '__all__'

    def get_answers(self, obj):
        answers = Answer.objects.filter(question=obj.id)
        serializer = AnswerSerializer(answers, many=True)
        return serializer.data


class QuizSerializer(DocumentSerializer):
    questions = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Quiz
        fields = '__all__'

    def get_questions(self, obj):
        questions = Question.objects.all()
        serializer = QuestionSerializer(questions, many=True)
        return serializer.data


class GuestResponseSerializer(DocumentSerializer):
    quiz_name = serializers.SerializerMethodField(read_only=True)
    total_qty = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = GuestResponse
        fields = '__all__'

    def get_quiz_name(self, obj):
        return obj.quiz.name

    def get_total_qty(self, obj):
        return obj.quiz.numOfQuestions
