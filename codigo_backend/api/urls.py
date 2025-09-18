from django.urls import path
from .views import MessageListCreate

urlpatterns = [
    path('contact/', MessageListCreate.as_view(), name='message-list-create'),
]