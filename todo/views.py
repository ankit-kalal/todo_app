from rest_framework import viewsets
from .models import TodoItem
from .serializers import TodoItemSerializer


from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView


class TodoItemViewSet(viewsets.ModelViewSet):
    queryset = TodoItem.objects.all().order_by('-task_priority')
    serializer_class = TodoItemSerializer




class LiveSearchAPIView(APIView):
    def get(self, request):
        search_term = request.GET.get('q', '')
        print("search_term",search_term)

        if search_term:
            results = TodoItem.objects.filter(title__icontains=search_term).order_by('-task_priority')
        else:
            results = TodoItem.objects.all().order_by('-task_priority')

        serializer = TodoItemSerializer(results, many=True)
        return Response(serializer.data)
       










@api_view(['GET'])
def TodoItemList(request):
    TodoItems = TodoItem.objects.all()
    serializer = TodoItemSerializer(TodoItems, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def TodoItemDetail(request, pk):
    TodoItems = TodoItem.objects.get(id=pk)
    serializer = TodoItemSerializer(TodoItems, many=False)
    return Response(serializer.data)


@api_view(['POST'])
def TodoItemCreate(request):
    serializer = TodoItemSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(['POST'])
def TodoItemUpdate(request, pk):
    todoItem = TodoItem.objects.get(id=pk)
    serializer = TodoItemSerializer(instance=todoItem, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)


@api_view(['DELETE'])
def TodoItemDelete(request, pk):
    todoItem = TodoItem.objects.get(id=pk)
    todoItem.delete()
    return Response('delete')
