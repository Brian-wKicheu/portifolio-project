from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ContactViewSet, ExperienceViewSet, ProfileViewSet, ProjectsViewSet, SkillsViewSet

router = DefaultRouter()
router.register(r'profile', ProfileViewSet, basename='profile')
router.register(r'skills', SkillsViewSet, basename='skills')
router.register(r'projects', ProjectsViewSet, basename='projects')
router.register(r'experience', ExperienceViewSet, basename='experience')
router.register(r'contact', ContactViewSet, basename='contact')

urlpatterns = [
   path('', include(router.urls)), 
   path('skills/by-category/', SkillsViewSet.as_view({'get': 'by_category'}), name='skills-by-category'),
   path('profile/main/', ProfileViewSet.as_view({'get': 'main'}), name='profile-main'),
   path('projects/featured/', ProjectsViewSet.as_view({'get': 'featured'}), name='projects-featured'),
]
