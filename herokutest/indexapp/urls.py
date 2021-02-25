from django.urls import path, include
from django.contrib import admin
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'Ideas', views.IdeaView, 'Idea')
router.register(r'Experts', views.ExpertView, 'Expert')
router.register(r'Opinions', views.OpinionView, 'Opinion')
router.register(r'Topics', views.TopicView, 'Topic')
router.register(r'Evidence', views.EvidenceView, 'Evidence')
router.register(r'Degree', views.DegreeView, 'Degree')
router.register(r'DegreeTitle', views.DegreeTitleView, 'DegreeTitle')
router.register(r'Expertise', views.ExpertiseView, 'Expertise')
router.register(r'University', views.UniversityView, 'University')

urlpatterns = [path('api/', include(router.urls))]
