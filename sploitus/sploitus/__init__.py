from __future__ import absolute_import, unicode_literals
# Импортируем Celery-приложение
from . import celery 

celery_app = celery.app

# Это обеспечивает доступ к Celery по имени `celery_app` в проекте
__all__ = ('celery_app',)