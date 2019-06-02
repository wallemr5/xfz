from django import  forms
from apps.forms import  FormMixin
from .models import News
from apps.news.models import Banner

class EditForm(forms.Form,FormMixin):
    pk = forms.IntegerField(error_messages={'required':'请输入一个分类'})
    name = forms.CharField(max_length=20)


class WriteNewsForm(forms.ModelForm,FormMixin):
    category = forms.IntegerField()
    class Meta:
        model = News
        exclude = ['category','author','pub_time']

class AddBannerForm(forms.ModelForm,FormMixin):
    class Meta:
        model = Banner
        fields = ('priority','link_to','image_url')

class EditBannerForm(forms.ModelForm,FormMixin):
    pk = forms.IntegerField()
    class Meta:
        model = Banner
        fields = ('priority','link_to','image_url')


class EditNewsForm(forms.ModelForm,FormMixin):
    category = forms.IntegerField()
    pk = forms.IntegerField()
    class Meta:
        model = News
        exclude = ['category','author','pub_time']