from django.urls import path
from . import views

app_name='news'
urlpatterns = [
    path('<int:detail_id>/', views.news_detail,name='news_detail'),
    path('list/',views.load_more_page,name='load_more_page'),
    path('public_comment/',views.public_comment,name='public_comment'),
]