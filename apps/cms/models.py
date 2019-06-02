from django.db import models

# Create your models here.



class Category(models.Model):
    name = models.CharField(max_length=20)


class News(models.Model):
    title = models.CharField(max_length=200)
    desc = models.CharField(max_length=200)
    thumbnail = models.URLField()
    content = models.TextField()
    pub_time = models.DateTimeField(auto_now_add=True)
    category = models.ForeignKey('Category',on_delete=models.SET_NULL,null=True)
    author = models.ForeignKey('xfz_auth.User',on_delete=models.SET_NULL,null=True)

    class Meta:
        ordering = ['-pub_time']


