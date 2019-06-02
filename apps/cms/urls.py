from django.urls import path
from . import views

app_name='cms'
urlpatterns = [
    path('',views.index,name='index'),
    path('category/',views.news_category,name='category'),
    path('write/',views.Write_news.as_view(),name='write'),
    path('add_category/',views.add_category,name='add_category'),
    path('delete_news_category/',views.delte_news_category,name='delete_category'),
    path('edit_news_category/',views.edit_news_category,name='edit_category'),
    path('upload_file/',views.upload_file,name='upload_file'),
    path('banners/',views.banners,name='banners'),
    path('add_banner/',views.add_banner,name='add_banner'),
    path('banner_list/',views.banner_list,name='list_banner'),
    path('delete_banner/',views.delete_banner,name='delete_banner'),
    path('edit_banner/',views.edit_banner,name='edit_banner'),
    path('news_list/',views.NewsListView.as_view(),name='news_list'),
    path('news_edit/<int:news_id>',views.EditNewsView.as_view(),name='news_edit'),
    path('news_delete/',views.delete_news,name='delete_news')
]