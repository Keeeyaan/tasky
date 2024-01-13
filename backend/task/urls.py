from django.urls import path
from . import views

urlpatterns = [
    path('task/', views.task_list),
    path('task/<int:id>', views.task_detail),
]
