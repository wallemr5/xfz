from django.shortcuts import render
from django.views.decorators.csrf import ensure_csrf_cookie
from apps.cms.models import News,Category
from django.conf import settings
from .serializer import NewsSerializers,CommentSerizlizer
from utils import restful
from django.http import  HttpResponse ,Http404
from .forms import PublicCommentForm
from .models import Comment,Banner
from apps.xfz_auth.decorator import xfz_login_require
# Create your views here.


def index(request):
    context = {'news':News.objects.select_related('author','category').all()[0:settings.ONE_PAGE_NEWS_COUNT],
               'categories':Category.objects.all(),'banners':Banner.objects.all()}
    return render(request,'news/index.html',context=context)

def load_more_page(request):
    p =int(request.GET.get('p'))
    category_id = int(request.GET.get('category_id',0))
    start = (p-1)*settings.ONE_PAGE_NEWS_COUNT
    end = start + settings.ONE_PAGE_NEWS_COUNT
    if category_id == 0 :
        news = News.objects.select_related('category','author').all()[start:end]
    else:
        news = News.objects.select_related('category','author').filter(category=category_id)[start:end]
    serializer = NewsSerializers(news,many=True)
    data = serializer.data
    return restful.result(data=data)


def news_detail(request,detail_id):
    try:
        news = News.objects.select_related('category','author').prefetch_related('comments__author').get(pk=detail_id)
        context = {'news':news}
        return render(request,'news/news_detail.html',context=context)
    except news.DoesNotExist:
        raise  Http404

def news_search(request):
    return render(request,'search/search.html')

@xfz_login_require
def public_comment(request):
    print(request.POST)
    form = PublicCommentForm(request.POST)
    if form.is_valid():
        news_id = form.cleaned_data.get('news_id')
        content = form.cleaned_data.get('content')
        news = News.objects.get(pk=news_id)
        comment = Comment.objects.create(content=content,news=news,author=request.user)
        serizlize = CommentSerizlizer(comment)
        return restful.result(data=serizlize.data)
    else:
        return restful.params_error(message=form.get_errors())