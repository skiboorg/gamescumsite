from django.db import models

class News(models.Model):
    name = models.CharField(max_length=255,blank=False,null=False)
    image = models.ImageField(upload_to='news_images/', null=True, blank=True)
    tag = models.CharField(max_length=15,blank=False,null=False)
    full_text = models.TextField(blank=False)
    created_at = models.DateTimeField(auto_now_add=True)

