from rest_framework import serializers
from .models import Answer, Question, GuestResponse


class AnswerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Answer
        fields = '__all__'
        extra_kwargs = {'correct': {'write_only': True}}


class QuestionSerializer(serializers.ModelSerializer):
    answers = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Question
        fields = '__all__'

    def get_answers(self, obj):
        answers = Answer.objects.filter(question=obj.id)
        serializer = AnswerSerializer(answers, many=True)
        return serializer.data


class GuestResponseSerializer(serializers.ModelSerializer):

    class Meta:
        model = GuestResponse
        fields = '__all__'
