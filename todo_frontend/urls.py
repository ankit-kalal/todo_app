from django.urls import path
from todo_frontend.views import todo_view

urlpatterns = [
    path('', todo_view, name='todo'),
]
