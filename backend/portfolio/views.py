import profile
from unicodedata import category

from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Contact, Experience, Profile, Project, Skills
from .serializers import ContactSerializer, ExperienceSerializer, ProfileSerializer, ProjectSerializer, SkillsSerializer

class ProfileViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    
    @action(detail=False, methods=['get'])#, url_path='main')
    def main(self, request):
        profile = Profile.objects.first()
        if profile :
            serializer = self.get_serializer(profile)
            return Response(serializer.data)
        return Response({'detail': 'Profile not found.'}, status=status.HTTP_404_NOT_FOUND)
    
class SkillsViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Skills.objects.all()
    serializer_class = SkillsSerializer
    
    @action(detail=False, methods=['get'])#, url_path='by-category')
    def by_category(self, request):
        skills = Skills.objects.all()
        categories ={}
        for skill in skills:
            if skill.category not in categories:
                categories[skill.category] = []
            categories[skill.category].append(SkillsSerializer(skill).data)
        return Response(categories)
    
class ProjectsViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer    
    
    @action(detail=False, methods=['get'])#, url_path='featured')
    def featured(self, request):
        featured_projects = Project.objects.filter(feature=True)
        serializer = self.get_serializer(featured_projects, many=True)
        return Response(serializer.data)
    
class ExperienceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer    
    
#this is a post since we will be receing data from the contact form on the frontend
class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    http_method_names = ['post']
    
    def create(self, request):
        serializer = self.get_serializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                            {'message': 'Message sent successfully.'}, status=status.HTTP_201_CREATED
                            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

