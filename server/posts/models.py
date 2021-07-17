from django.db import models

# Create your models here.
class Post(models.Model):
    title = models.TextField(unique=True)
    content = models.TextField(null=True, blank=True)
    author = models.TextField(default='Anonymous', null=True, blank=True)
    attchment = models.TextField(null=True, blank=True)
    like = models.IntegerField(default=0, null=True, blank=True)
    created_on = models.DateTimeField(auto_now=True, null=True, blank=True)
    modified_on = models.DateTimeField(auto_now=True, null=True, blank=True)