from django.db import models

class Project(models.Model):
    name = models.CharField(max_length=100,unique=True)
    start_date = models.DateField()
    end_date = models.DateField()
    comments = models.CharField(max_length=200,blank=True,null=True)
    status = models.CharField(max_length=100,default='In Progress')
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name