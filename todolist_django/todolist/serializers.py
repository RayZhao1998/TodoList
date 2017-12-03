from rest_framework import serializers
from todolist.models import Todo

class TodoSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    task = serializers.CharField(max_length=100)
    isCompleted = serializers.CharField(max_length=2, default='0')
    priority = serializers.CharField(max_length=2, default='0')
    endyear = serializers.IntegerField()
    endmonth = serializers.IntegerField()
    endday = serializers.IntegerField()
    content = serializers.CharField(max_length=200)

    def create(self, validated_data):
        return Todo.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.task = validated_data.get('todo', instance.task)
        instance.isCompleted = validated_data.get('isCompleted', instance.isCompleted)
        instance.priority = validated_data.get('priority', instance.priority)
        instance.endyear = validated_data.get('endyear', instance.endyear)
        instance.endmonth = validated_data.get('endmonth', instance.endmonth)
        instance.endday = validated_data.get('endday', instance.endday)
        instance.content = validated_data.get('content', instance.content)
        instance.save()
        return instance

    class Meta:
        model = Todo
        fields = ('id', 'task', 'isCompleted', 'priority', 'endyear', 'endmonth', 'endday', 'content')