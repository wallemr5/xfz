from  django.http import JsonResponse
class HttpCode:
    ok = 200
    paramserror = 400
    unauth = 401
    methoderror = 405
    servererror = 500

def result(code=HttpCode.ok,message='',data=None,**kwargs):
    json_dict = {'code':code,'message':message,'data':data}
    if kwargs and isinstance(kwargs,dict) and kwargs.keys():
        json_dict.update(kwargs)
    return JsonResponse(json_dict)

def ok(message='',data=None,**kwargs):
    return result(code=HttpCode.ok,message=message,data=data,**kwargs)

def params_error(message='',data=None,**kwargs):
    return result(code=HttpCode.paramserror,message=message,data=data,**kwargs)

def unauth(message='',data=None,**kwargs):
    return result(code=HttpCode.paramserror,message=message,data=data,**kwargs)

def method_error(message='',data=None,**kwargs):
    return result(code=HttpCode.methoderror,message=message,data=data,**kwargs)

def server_error(message='',data=None,**kwargs):
    return result(code=HttpCode.servererror,message=message,data=data,**kwargs)