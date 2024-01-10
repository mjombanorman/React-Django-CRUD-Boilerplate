from django.db import models

class ProjectManager(models.Model):
    name = models.CharField(max_length=100,unique=True)
    email = models.EmailField(max_length=100,unique=True,null=True,blank=True)
    phone = models.CharField(max_length=100,unique=True,null=True,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name
class Project(models.Model):
    name = models.CharField(max_length=100,unique=True)
    project_manager = models.ForeignKey(ProjectManager,on_delete=models.CASCADE,null=True,blank=True)
    start_date = models.DateField()
    end_date = models.DateField()
    comments = models.CharField(max_length=200,blank=True,null=True)
    status = models.CharField(max_length=100,default='In Progress')
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name