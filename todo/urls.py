from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TodoItemViewSet,LiveSearchAPIView

router = DefaultRouter()
router.register(r'api/todos', TodoItemViewSet)




urlpatterns = [
    path('api/todos/search/', LiveSearchAPIView.as_view(), name="search"),
    path('', include(router.urls)),
    
]
