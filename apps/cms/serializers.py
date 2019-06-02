from rest_framework import serializers
from apps.news.models import Banner

class BannerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Banner
        fields = ('id','image_url','priority','link_to')