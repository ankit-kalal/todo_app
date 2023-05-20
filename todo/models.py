from django.db import models

class TodoItem(models.Model):
    
    title = models.CharField(max_length=100)
    task_priority = models.IntegerField(default=0)
    completed = models.BooleanField(default=False)

    def __str__(self):
        return self.title
