from django.shortcuts import render

# Create your views here.
def payinfo(request):
    return render(request,'payinfo/payinfo.html')