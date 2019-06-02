from django.shortcuts import render,reverse,redirect
from django.contrib.auth import  logout ,login,authenticate
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import ensure_csrf_cookie
from .forms import  LoginForm ,RegisterForm
from django.http import JsonResponse,HttpResponse
from utils.restful import *
from  utils.captcha.xfzcaptcha import  Captcha
from io import BytesIO
from  utils.aliyunsdk.send_message import send_sms
from utils.restful import *
from django.core.cache import  cache
from django.contrib.auth import get_user_model
# Create your views here.

User = get_user_model()

@ensure_csrf_cookie
def login_view(request):
    print(request.POST)
    form = LoginForm(request.POST)
    if form.is_valid():
        telephone = form.cleaned_data.get('telephone')
        password = form.cleaned_data.get('password')
        remember = form.cleaned_data.get('remember')
        print(remember)
        user = authenticate(request,username=telephone,password=password)
        print(user)
        if user :
            if user.is_active:
                login(request,user)
                if remember :
                    request.session.set_expiry(None)
                else:
                    request.session.set_expiry(0)
                return ok()
            else:
                return unauth(message='the user is unactive')
        else:
                return unauth(message='user or password wrong')
    else:
        return params_error(message=form.get_errors())



def logout_view(request):
    logout(request)
    return redirect(reverse('index'))



def img_captcha(request):
    text,img = Captcha.gene_code()
    out = BytesIO()
    img.save(out,'png')
    out.seek(0)
    response = HttpResponse(content_type='image/png')
    response.write(out.read())
    response['Content-length']=out.tell()
    cache.set(text.lower(),text.lower(),300)
    return response

def sms_captcha(request):
    telephone = request.GET.get('telephone')
    txt  = Captcha.gene_text()
    print(txt)
    # result = send_sms(telephone,txt)
    cache.set(telephone,txt,60)
    # print(result)
    print(ok())
    return ok()


def register(request):
    form = RegisterForm(request.POST)
    try:
        if form.is_valid():
            telephone = form.cleaned_data.get('telephone')
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password1')
            print("~~~~~~~~~~~~~")
            print(username)
            user = User.objects.create_user(telephone=telephone,username=username,password=password)
            login(request,user)
            return ok()
    except:
        return params_error(message=form.get_errors())