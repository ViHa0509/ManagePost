from base64 import b64decode
from django.core.files.base import ContentFile
from django.utils.crypto import get_random_string
from rest_framework import serializers
from rest_framework import status
from rest_framework.mixins import CreateModelMixin, ListModelMixin, UpdateModelMixin, DestroyModelMixin
from posts.models import Post
from posts.serializers import PostSerializer, CreatePostSerializer, UpdatePostSerializer
from rest_framework.response import Response
from rest_framework.viewsets  import ModelViewSet

class PostViewSet(ModelViewSet):
    serializer_class = PostSerializer
    def get_queryset(self):
        queryset = Post.objects.all()
        return queryset
    
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        # queryset = queryset.order_by('-created_on')
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def retrieve(self, request, *args, **kwargs):
        post= self.get_object()
        print(post)
        serializer = self.get_serializer(post)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        serializer = CreatePostSerializer(data=request.data)
        if serializer.is_valid():
            post = Post.objects.create(
                title=serializer.validated_data['title'],
                content=serializer.validated_data['content'],
                attchment=None
            )
            attchment=serializer.validated_data['attchment']
            if isinstance(attchment, str):
                if 'data:' in attchment and ';base64,' in attchment:
                    image_data = b64decode(attchment.split('base64,')[1])
                    setattr(post, 'attchment', ContentFile(image_data, '{}.png'.format(get_random_string(length=32))))
            else:
                setattr(post, attchment, None)
            post.save()
            return Response(self.get_serializer(post).data, status.HTTP_201_CREATED)
        return Response(serializer.errors,  status.HTTP_400_BAD_REQUEST)
    
    def update(self, request, *args, **kwargs):
        serializer = UpdatePostSerializer(data=request.data)
        post = self.get_object()
        if serializer.is_valid():
            for attr, value in serializer.validated_data.items():
                setattr(post, attr, value)
            attchment=serializer.validated_data['attchment']
            if isinstance(attchment, str):
                if 'data:' in attchment and ';base64,' in attchment:
                    image_data = b64decode(attchment.split('base64,')[1])
                    setattr(post, 'attchment', ContentFile(image_data, '{}.png'.format(get_random_string(length=32))))
            else:
                setattr(post, attchment, None)
            post.save()
            return Response(self.get_serializer(post).data, status=status.HTTP_200_OK)
        return Response(serializer.errors,  status.HTTP_400_BAD_REQUEST)
    
    def destroy(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        post = self.get_object()
        post.delete()
        return Response({}, status=status.HTTP_200_OK)