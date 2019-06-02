from django import  forms
from django.core.cache import cache
from apps.forms import FormMixin
from .models import User
from utils import  restful

class LoginForm(forms.Form,FormMixin):
    telephone = forms.CharField(max_length=11)
    password = forms.CharField(max_length=20,min_length=6)
    remember = forms.IntegerField(required=False)


class RegisterForm(forms.Form,FormMixin):
    telephone = forms.CharField(max_length=11)
    password1 = forms.CharField(max_length=20, min_length=6)
    password2 = forms.CharField(max_length=20, min_length=6)
    img_captcha = forms.CharField(max_length=4,min_length=4)
    sms_captcha = forms.CharField(max_length=4,min_length=4)
    username = forms.CharField(max_length=20)
    def clean(self):
       cleaned_data=super().clean()
       password1 = cleaned_data.get('password1')
       password2 = cleaned_data.get('password2')
       telephone = cleaned_data.get('telephone')
       img_captcha = cleaned_data.get('img_captcha')
       sms_captcha = cleaned_data.get('sms_captcha')
       if password1 != password2 :
            raise ValueError("密码不一致")
       try:
           if img_captcha:
                cache_img_captcha = cache.get(img_captcha.lower())
           if not cache_img_captcha or cache_img_captcha != img_captcha:
               raise ValueError ("图形验证码错误")
       except:
           raise ValueError("图形验证码错误")
       cache_sms_captcha = cache.get(telephone)
       if not cache_img_captcha or sms_captcha != cache_sms_captcha:
           raise ValueError("手机验证码错误")
       exsits = User.objects.filter(telephone=telephone).exists()
       if exsits:
           raise    ValueError("手机号码已经存在")
       return cleaned_data


