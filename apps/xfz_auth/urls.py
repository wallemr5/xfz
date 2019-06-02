from django.urls import path
from . import views

app_name='xfz_auth'
urlpatterns = [
    path('login/', views.login_view,name='login'),
    path('logout/',views.logout_view,name='logout'),
    path('img_captcha/',views.img_captcha,name='img_captcha'),
    path('send_message/',views.sms_captcha,name='send_message'),
    path('register/',views.register,name='register')
]