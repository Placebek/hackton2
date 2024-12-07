# my_project/celery.py
from __future__ import absolute_import, unicode_literals
import os
from celery import Celery

# Указываем Django настройки
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'sploitus.settings')

app = Celery('sploitus')

# Загружаем конфигурацию из settings.py с префиксом CELERY_
app.config_from_object('django.conf:settings', namespace='CELERY')

# Автоматически обнаруживаем задачи в приложениях Django
app.autodiscover_tasks()

@app.task(bind=True)
def debug_task():
    print('Request: asdasdasd')