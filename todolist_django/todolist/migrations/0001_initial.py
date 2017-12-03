# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2017-12-02 05:31
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Todo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('todo', models.CharField(max_length=50)),
                ('flag', models.CharField(default='1', max_length=2)),
                ('priority', models.CharField(default='0', max_length=2)),
                ('pubtime', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'ordering': ['priority', 'pubtime'],
            },
        ),
    ]