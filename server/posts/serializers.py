from rest_framework import serializers
from posts.models import Post, CommentPost
from datetime import datetime
class CreatePostSerializer(serializers.Serializer):
    title = serializers.CharField()
    content = serializers.CharField()
    attchment = serializers.CharField()

class UpdatePostSerializer(serializers.Serializer):
    title = serializers.CharField()
    content = serializers.CharField()
    attchment = serializers.CharField()
    like = serializers.IntegerField()

class PostSerializer(serializers.ModelSerializer):
    # attchment = serializers.ImageField()
    class Meta:
        model = Post
        fields = [
            'id', 'title', 'content', 'author', 'attchment', 'like', 'created_on'
        ]

class CommentPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommentPost
        fields = [
            'id', 'message', 'created_on'
        ]

class CreateCommentSerializer(serializers.Serializer):
    post_id = serializers.IntegerField()
    message = serializers.CharField()
