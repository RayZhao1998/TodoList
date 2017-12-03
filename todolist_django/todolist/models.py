# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import models

class Todo(models.Model):
    task = models.CharField(max_length=50)
    isCompleted = models.CharField(max_length=2, default='0')
    priority = models.CharField(max_length=2, default='0')
    endyear = models.IntegerField(default=0)
    endmonth = models.IntegerField(default=0)
    endday = models.IntegerField(default=0)
    content = models.CharField(max_length=200, default='') 

    def __unicode__(self):
        return u'%d  %s %s' % (self.id, self.task, self.isCompleted)

    class Meta:
        ordering = ['priority']

