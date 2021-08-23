from django.db import models
from django.core.files import File
from urllib.request import urlopen
from tempfile import NamedTemporaryFile

# Create your models here.
class Post(models.Model):
    title = models.TextField(null=False)
    content = models.TextField(null=True, blank=True)
    author = models.TextField(default='Anonymous', null=True, blank=True)
    attchment = models.ImageField(upload_to='images/')
    like = models.IntegerField(default=0, null=True, blank=True)
    created_on = models.DateTimeField(auto_now=True, null=True, blank=True)
    modified_on = models.DateTimeField(auto_now=True, null=True, blank=True)

class CommentPost(models.Model):
    message = models.TextField(null=True, blank=True)
    created_on = models.DateTimeField(auto_now=True, null=True, blank=True)
    modified_on = models.DateTimeField(auto_now=True, null=True, blank=True)
    post = models.ForeignKey('posts.Post', on_delete=models.CASCADE, related_name='comment')