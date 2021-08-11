from base64 import b64decode
from django.core.files.base import ContentFile
from django.utils.crypto import get_random_string
from rest_framework import serializers, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets  import ModelViewSet
from rest_framework.mixins import CreateModelMixin, ListModelMixin, UpdateModelMixin, DestroyModelMixin
from posts.models import Post, CommentPost
from posts.serializers import PostSerializer, CreatePostSerializer, UpdatePostSerializer, CommentPostSerializer, CreateCommentSerializer
from server.pagination import SixPerPagePagination

class PostViewSet(ModelViewSet):
    serializer_class = PostSerializer
    paginations_class = SixPerPagePagination
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
        post = self.get_object()
        post.delete()
        return Response({}, status=status.HTTP_200_OK)
    
    @action(methods=['get'], detail=True, url_path='comment', pagination_class=SixPerPagePagination)
    def get_comment(self, request, *args, **kwargs):
        post = self.get_object()
        comments = CommentPost.objects.filter(post=post)
        page = self.paginate_queryset(comments)
        if page is not None:
            serializer = CommentPostSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = CommentPostSerializer(post, many=True)
        return Response(serializer.data)

class CommentPostViewSet(ModelViewSet):
    serializer_class = CommentPostSerializer
    def get_queryset(self):
        queryset = CommentPost.objects.all()
        return queryset

    def create(self, request, *args, **kwargs):
        serializer = CreateCommentSerializer(data=request.data)
        if serializer.is_valid():
            post_id = serializer.validated_data.get('post_id')
            post = Post.objects.filter(pk=post_id).first()
            message = serializer.validated_data.get('message')
            post = CommentPost.objects.create(message=message, post=post)
            return Response( self.get_serializer(post).data, status=status.HTTP_200_OK) 
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        comment = self.get_object()
        serializer = CreateCommentSerializer(data=request.data)
        if serializer.is_valid():
            message = serializer.validated_data('message')
            comment.message = message
            comment.save()
            return Response(self.get_serializer(comment).data, status=status.HTTP_200_OK) 
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def destroy(self, request, *args, **kwargs):
        comment = self.get_object()
        comment.delete()
        return Response(status=status.HTTP_200_OK)
        
