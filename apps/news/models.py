from django.db import models

# Create your models here.




class Comment(models.Model):
    content = models.TextField()
    pub_time = models.DateTimeField(auto_now_add=True)
    news = models.ForeignKey("cms.News",on_delete=models.CASCADE,related_name='comments')
    author = models.ForeignKey("xfz_auth.User",on_delete=models.CASCADE)

    class Meta:
        ordering = ['-pub_time']



class Banner(models.Model):
    priority = models.IntegerField(default=0)
    image_url = models.URLField()
    link_to = models.URLField()
    pub_time = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-priority']