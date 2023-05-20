from django.shortcuts import render

def todo_view(request):
    return render(request, 'todo_frontend/todo.html')
