from django.db import models
from django.urls import reverse

# Create your models here.


# University model
class University(models.Model):
    name = models.CharField(max_length=100)
    location = models.TextField(max_length=100,
                                help_text='Enter university location')

    def __str__(self):
        return self.name


# Idea model
class Idea(models.Model):
    title = models.CharField(max_length=200)
    proposed_by = models.ForeignKey('Expert',
                                    on_delete=models.SET_NULL,
                                    null=True,
                                    related_name='proposed_ideas')
    pub_date = models.DateField(auto_now=True)
    description = models.TextField(max_length=10000,
                                   help_text='Enter your idea here',
                                   blank=True)

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse('policy-detail', args=[str(self.id)])

    def getExpert(self):
        return f'{self.proposed_by.first_name} {self.proposed_by.last_name}'


# Expertise model
class Expertise(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


# Topic model
class Topic(models.Model):
    name = models.CharField(max_length=200, help_text='Enter a topic')
    description = models.TextField(
        max_length=1000,
        help_text='Enter a description of the topic',
        blank=True)
    ideas = models.ManyToManyField(Idea, related_name="topics")
    expertises = models.ManyToManyField(Expertise,
                                        related_name='related_topics')

    def __str__(self):
        return self.name


# Opinion model
class Opinion(models.Model):
    class Conviction(models.IntegerChoices):
        STRONGLY_DISAGREE = 0
        DISAGREE = 1
        NEUTRAL = 2
        AGREE = 3
        STRONGLY_AGREE = 4

    on_idea = models.ForeignKey('Idea',
                                on_delete=models.SET_NULL,
                                null=True,
                                related_name='opinions')
    held_by_expert = models.ForeignKey('Expert',
                                       on_delete=models.SET_NULL,
                                       null=True,
                                       related_name='opinions')
    conviction = models.IntegerField(choices=Conviction.choices)
    statement = models.TextField(max_length=1000,
                                 help_text='Optional statement about opinion',
                                 blank=True)

    def __str__(self):
        return f'{self.on_idea} - {self.statement}'

    def findExpert(self):
        return f'{self.held_by_expert.first_name} {self.held_by_expert.last_name}'

    def findIdea(self):
        return self.on_idea.title


# Evidence model
class Evidence(models.Model):
    title = models.CharField(max_length=100)
    link = models.CharField(max_length=1000)
    description = models.TextField(max_length=10000,
                                   help_text='Enter your policy here',
                                   blank=True)
    supports_ideas = models.ManyToManyField(Idea, related_name='evidence')
    opinions_justified = models.ManyToManyField(
        Opinion, related_name='opinion_evidence')

    def __str__(self):
        return self.title


# Expert model
class Expert(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    middle_name = models.CharField(max_length=100, blank=True)
    email = models.CharField(max_length=100, blank=True)
    biography = models.TextField(max_length=1000,
                                 help_text='Enter your biography here',
                                 blank=True)

    class Meta:
        ordering = ['last_name', 'first_name']

    def get_absolute_url(self):
        return reverse('expert-detail', args=[str(self.id)])

    def __str__(self):
        return f'{self.last_name}, {self.first_name}'


# Degree model
class Degree(models.Model):
    title = models.ForeignKey('DegreeTitle',
                              on_delete=models.SET_NULL,
                              null=True,
                              related_name='degrees_with')
    deg_from = models.ForeignKey('University',
                                 on_delete=models.SET_NULL,
                                 null=True,
                                 related_name='degrees_from')
    given_to = models.ForeignKey('Expert',
                                 on_delete=models.SET_NULL,
                                 null=True,
                                 related_name='credentials')

    def __str__(self):
        return str(self.title)

    def findUniversity(self):
        return self.deg_from.name

    def findDegTitle(self):
        return self.title.__str__()

    def findExpert(self):
        return self.given_to.__str__()


# DegreeTitle model
class DegreeTitle(models.Model):
    title = models.CharField(max_length=100)
    expertise = models.ForeignKey('Expertise',
                                  related_name='degree_titles',
                                  on_delete=models.SET_NULL,
                                  null=True)

    def __str__(self):
        return self.title