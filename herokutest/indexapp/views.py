from django.http import HttpResponse
from django.template import loader
from rest_framework import viewsets
from .models import Idea, Opinion, Expert, Topic, Evidence, Degree, University, DegreeTitle, Expertise
from .serializers import IdeaSerializer, OpinionSerializer, ExpertSerializer, TopicSerializer, EvidenceSerializer,\
    DegreeSerializer, UniversitySerializer, DegreeTitleSerializer, ExpertiseSerializer


class IdeaView(viewsets.ModelViewSet):
    serializer_class = IdeaSerializer
    queryset = Idea.objects.all()


class ExpertView(viewsets.ModelViewSet):
    serializer_class = ExpertSerializer
    queryset = Expert.objects.all()


class OpinionView(viewsets.ModelViewSet):
    serializer_class = OpinionSerializer
    queryset = Opinion.objects.all()


class TopicView(viewsets.ModelViewSet):
    serializer_class = TopicSerializer
    queryset = Topic.objects.all()


class EvidenceView(viewsets.ModelViewSet):
    serializer_class = EvidenceSerializer
    queryset = Evidence.objects.all()


class DegreeView(viewsets.ModelViewSet):
    serializer_class = DegreeSerializer
    queryset = Degree.objects.all()


class UniversityView(viewsets.ModelViewSet):
    serializer_class = UniversitySerializer
    queryset = University.objects.all()


class DegreeTitleView(viewsets.ModelViewSet):
    serializer_class = DegreeTitleSerializer
    queryset = DegreeTitle.objects.all()


class ExpertiseView(viewsets.ModelViewSet):
    serializer_class = ExpertiseSerializer
    queryset = Expertise.objects.all()


def index(request):
    template = loader.get_template('index.html')
    context = {}
    return HttpResponse(template.render(context, request))
