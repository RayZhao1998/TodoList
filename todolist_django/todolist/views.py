# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render, render_to_response
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponseRedirect, HttpResponse
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from models import Todo
from serializers import TodoSerializer
from django.core.paginator import Paginator

class JSONResponse(HttpResponse):
    def __init__(self, data, **kwargs):
        content = JSONRenderer().render(data)
        kwargs['content_type'] = 'application/json'
        super(JSONResponse, self).__init__(content, **kwargs)

@csrf_exempt
def todo_list(request):
    if request.method == 'GET':
        limit = 5 
        todos = Todo.objects.filter(isCompleted='0')
        todos = todos.order_by("-id")
        paginater = Paginator(todos, limit)
        page = request.GET.get('page', 1)
        loaded = paginater.page(page)
        serializer = TodoSerializer(loaded, many=True)
        return JSONResponse(serializer.data)

@csrf_exempt
def todo_list_orderedby_priority(request):
    if request.method == 'GET':
        todos = Todo.objects.filter(isCompleted='0')
        todos = todos.order_by("-priority")
        limit = 5
        paginater = Paginator(todos, limit)
        page = request.GET.get('page', 1)
        loaded = paginater.page(page)
        serializer = TodoSerializer(loaded, many=True)
        return JSONResponse(serializer.data)

@csrf_exempt
def add_todo(request):
    if request.method == 'POST':
        limit = 5
        task = request.POST['task']
        priority = request.POST['priority']
        endyear = request.POST['endyear']
        endmonth = request.POST['endmonth']
        endday = request.POST['endday']
        content = request.POST['content']
        todo = Todo(task=task, isCompleted='0', priority=priority, endyear=endyear, endmonth=endmonth, endday=endday)
        todo.save()
        todolist = Todo.objects.filter(isCompleted='0')
        todolist = todolist.order_by("-id")
        paginater = Paginator(todolist, limit)
        page = request.GET.get('page', 1)
        loaded = paginater.page(page)
        serializer = TodoSerializer(loaded, many=True)
        return JSONResponse(serializer.data)
    else:
        limit = 5
        todolist = Todo.objects.filter(isCompleted='0')
        todolist = todolist.order_by("-id")
        paginater = Paginator(todolist, limit)
        page = request.GET.get('page', 1)
        loaded = paginater.page(page)
        serializer = TodoSerializer(loaded, many=True)
        return JSONResponse(serializer.data)

@csrf_exempt
def todofinished(request):
    if request.method == 'GET':
        limit = 5
        todos = Todo.objects.filter(isCompleted='1')
        todos = todos.order_by("-id")
        paginater = Paginator(todos, limit)
        page = request.GET.get('page', 1)
        loaded = paginater.page(page)
        serializer = TodoSerializer(loaded, many=True)
        return JSONResponse(serializer.data)

@csrf_exempt
def finish_todo(request):
    limit = 5
    if request.method == 'POST':
        id = request.POST['id']
        todo = Todo.objects.get(id=id)
        if todo.isCompleted == '0':
            todo.isCompleted = '1'
            todo.save()
    todolist = Todo.objects.filter(isCompleted='0')
    todolist = todolist.order_by("-id")
    paginater = Paginator(todolist, limit)
    page = request.GET.get('page', 1)
    loaded = paginater.page(page)
    serializer = TodoSerializer(loaded, many=True)
    return JSONResponse(serializer.data)

@csrf_exempt
def update_todo(request):
    limit = 5
    if request.method == 'POST':
        id = request.POST['id']
        task = request.POST['task']
        todo = Todo.objects.get(id=id)
        todo.task = task;
        todo.save()
    todolist = Todo.objects.filter(isCompleted='0')
    todolist = todolist.order_by("-id")
    paginater = Paginator(todolist, limit)
    page = request.GET.get('page', 1)
    loaded = paginater.page(page)
    serializer = TodoSerializer(loaded, many=True)
    return JSONResponse(serializer.data)

@csrf_exempt
def delete_todo(request):
    limit = 5
    if request.method == 'POST':
        id = request.POST['id']
        todo = Todo.objects.get(id=id)
        todo.delete()
    todolist = Todo.objects.filter(isCompleted='0')
    todolist = todolist.order_by("-id")
    paginater = Paginator(todolist, limit)
    page = request.GET.get('page', 1)
    loaded = paginater.page(page)
    serializer = TodoSerializer(loaded, many=True)
    return JSONResponse(serializer.data)

def render_html(request):
    return render(request, 'index.html')
