from django.shortcuts import render
from rest_framework import viewsets,permissions
from .models import Project
from .serializers import ProjectSerializer
from rest_framework.response import Response

class ProjectViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    def list(self, request):
        queryset = Project.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)
    
    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        else:
            return Response(serializer.errors, status=400)  
       
    def retrieve(self, request,pk=None):
        serializer = self.serializer_class(self.queryset.get(pk=pk))
        return Response(serializer.data)
    
    def update(self, request,pk=None):
        project = self.queryset.get(pk=pk)
        serializer = self.serializer_class(project,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        else:
            return Response(serializer.errors, status=400)
          
    def destroy(self, request,pk=None):
        project = self.queryset.get(pk=pk)
        project.delete()
        return Response(status=204)
   