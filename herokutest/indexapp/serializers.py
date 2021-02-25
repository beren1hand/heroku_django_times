from rest_framework import serializers
from .models import Idea, Expert, Opinion, Topic, Evidence, Degree, University, DegreeTitle, Expertise


class EvidenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Evidence
        fields = ('id', 'title', 'link', 'description', 'opinions_justified',
                  'supports_ideas')


class OpinionSerializer(serializers.ModelSerializer):
    expert_name = serializers.StringRelatedField(source="findExpert")
    idea_name = serializers.StringRelatedField(source="findIdea")
    opinion_evidence = EvidenceSerializer(read_only=True, many=True)

    class Meta:
        model = Opinion
        fields = ('id', 'on_idea', 'held_by_expert', 'conviction',
                  'opinion_evidence', 'statement', 'expert_name', 'idea_name')


class DegreeSerializer(serializers.ModelSerializer):
    university = serializers.StringRelatedField(source="findUniversity")
    title_name = serializers.StringRelatedField(source="findDegTitle")
    expert_name = serializers.StringRelatedField(source="findExpert")

    class Meta:
        model = Degree
        fields = ('id', 'title', 'deg_from', 'given_to', 'university',
                  'title_name', 'expert_name')


class UniversitySerializer(serializers.ModelSerializer):
    degrees_from = DegreeSerializer(read_only=True, many=True)

    class Meta:
        model = University
        fields = ('id', 'name', 'location', 'degrees_from')


class DegreeTitleSerializer(serializers.ModelSerializer):
    degrees_with = DegreeSerializer(read_only=True, many=True)

    class Meta:
        model = DegreeTitle
        fields = ('id', 'title', 'expertise', 'degrees_with')


class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topic
        fields = ('id', 'name', 'description', 'expertises')


class ExpertiseSerializer(serializers.ModelSerializer):
    degree_titles = DegreeTitleSerializer(read_only=True, many=True)
    related_topics = TopicSerializer(read_only=True, many=True)

    class Meta:
        model = Expertise
        fields = ('id', 'name', 'degree_titles', 'related_topics')


class IdeaSerializer(serializers.ModelSerializer):
    opinions = OpinionSerializer(read_only=True, many=True)
    evidence = EvidenceSerializer(read_only=True, many=True)
    topics = TopicSerializer(read_only=True, many=True)
    expert_name = serializers.StringRelatedField(source="getExpert")

    class Meta:
        model = Idea
        fields = ('id', 'title', 'proposed_by', 'evidence', 'pub_date',
                  'topics', 'description', 'opinions', 'expert_name')


class ExpertSerializer(serializers.ModelSerializer):
    credentials = DegreeSerializer(read_only=True, many=True)
    opinions = OpinionSerializer(read_only=True, many=True)
    proposed_ideas = IdeaSerializer(read_only=True, many=True)

    class Meta:
        model = Expert
        fields = ('id', 'first_name', 'last_name', 'middle_name', 'email',
                  'biography', 'credentials', 'opinions', 'proposed_ideas')
