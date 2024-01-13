from django.db import models
from django.utils.translation import gettext_lazy as _


class Task(models.Model):
    class TaskStatus(models.TextChoices):
        HIGH = 'HIGH', _('HIGH')
        MEDIUM = 'MEDIUM', _('MEDIUM')
        LOW = 'LOW', _('LOW')

    title = models.CharField(max_length=100, blank=True, default="")
    description = models.CharField(max_length=250, blank=True, default="")
    priority = models.CharField(
        max_length=6, choices=TaskStatus.choices, default=TaskStatus.LOW)
    completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.task
