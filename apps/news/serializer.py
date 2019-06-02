from rest_framework import serializers
from apps.cms.models import News,Category
from .models import Comment
from apps.xfz_auth.serializer import UserSerializer

class CategorySerializers(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id','name')

class NewsSerializers(serializers.ModelSerializer):
    category = CategorySerializers()
    author = UserSerializer()
    class Meta:
        model = News
        fields = ('id','title','desc','thumbnail','pub_time','author','category')


class CommentSerizlizer(serializers.ModelSerializer):
    author = UserSerializer()
    class Meta:
        model = Comment
        fields = ('id','content','author','pub_time')