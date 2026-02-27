from django.db import models

class Profile(models.Model):
    name = models.CharField(max_length=100)
    title = models.CharField(max_length=100)
    bio = models.TextField()
    phone_number = models.CharField(max_length=20, blank=True) 
    email = models.EmailField() 
    location = models.CharField(max_length=100, blank=True)
    github_link = models.URLField(blank=True)
    twitter_link = models.URLField(blank=True)
    resume = models.FileField(upload_to='resumes/', blank=True, null=True)#add to media directory
    profile_image = models.ImageField(upload_to='profile_images/', blank=True, null=True)#add to media directory
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    

    def __str__(self):
        return self.name
    
class Skills(models.Model):
    CATEGORY_CHOICES = [
        ('Frontend', 'Frontend'),
        ('Backend', 'Backend'),
        ('Database', 'Database'),
        ('DevOps', 'DevOps'),
        ('Tools', 'Tools'),
        ('Other', 'Other'),
    ]
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=100, choices=CATEGORY_CHOICES)
    proficiency = models.IntegerField(default=50)
    icon = models.CharField(max_length=50, blank=True)
    order = models.IntegerField(default=0)
    
    def __str__(self):
        return f"{self.name} ({self.category})"
    
    class Meta:
        ordering = ['order', 'category', 'name']
        
        
class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    technologies = models.CharField(max_length=200)
    image = models.ImageField(upload_to='projects/', blank=True, null=True)
    github_link = models.URLField(blank=True)
    live_link = models.URLField(blank=True)
    feature = models.BooleanField(default=False)
    order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
    
    class Meta:
        ordering = ['-feature', 'order', '-created_at']


class Experience(models.Model):
    company = models.CharField(max_length=200)
    position = models.CharField(max_length=200)
    start_date = models.DateField() 
    end_date = models.DateField(blank=True, null=True)
    description = models.TextField(blank=True)
    current = models.BooleanField(default=False)
    company_logo = models.ImageField(upload_to='companies/', blank=True, null=True)
    
    def __str__(self):
        return f"{self.position} at {self.company}" 
    
    class Meta:
        ordering = ['-start_date']
        
class Contact(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=200)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message from {self.name} - {self.subject}"
    
    class Meta:
        ordering = ['-created_at']