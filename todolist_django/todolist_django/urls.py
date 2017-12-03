"""todolist_django URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from todolist.views import todo_list , render_html, add_todo, finish_todo, delete_todo, todo_list_orderedby_priority, todofinished, update_todo

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^todolist/', todo_list),
    url(r'^addtodo/', add_todo),
    url(r'^$', render_html), 
    url(r'^finishtodo', finish_todo),
    url(r'^deletetodo', delete_todo),
    url(r'^todolistpriority', todo_list_orderedby_priority),
    url(r'^todolistfinished', todofinished),
    url(r'^updatetodo', update_todo),
]
