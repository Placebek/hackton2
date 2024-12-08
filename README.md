# Vulnerability Scanner and Exploit Checker

## Описание

**Vulnerability Scanner and Exploit Checker** — это веб-приложение для проверки уязвимостей. Оно автоматически парсит последние уязвимости с [sploitus.com](https://sploitus.com) и проверяет IP-адреса или доменные имена на наличие уязвимых сервисов, используя эксплойты и PoC.  

Проект состоит из:
- **Бэкенд**: Django с использованием Aiogram для взаимодействия с ботами.
- **Парсинг**: Selenium для работы с внешними ресурсами.
- **Очереди**: Celery и Redis для асинхронной обработки задач.
- **Фронтенд**: React для интуитивного пользовательского интерфейса.

---

## Установка и запуск

### Требования:
- **Python** 3.10+
- **Node.js** 16+
- **PostgreSQL**
- **Redis**

### 1. Клонирование репозитория
Скопируйте репозиторий и перейдите в его папку:
```bash
git clone <URL вашего репозитория>
cd <название_папки>
```

### 2. Установка и настройка бэкенда
1. Установите зависимости Python:
   ```bash
   pip install -r requirements.txt
   ```

2. Создайте файл `.env` и добавьте в него необходимые переменные окружения:
   ```
   SECRET_KEY=ваш_секретный_ключ
   DEBUG=True
   DATABASE_URL=postgres://user:password@localhost:5432/db_name
   REDIS_URL=redis://localhost:6379/0
   ```

3. Примените миграции базы данных:
   ```bash
   python manage.py migrate
   ```

4. Создайте суперпользователя для доступа к админке:
   ```bash
   python manage.py createsuperuser
   ```

5. Запустите сервер разработки:
   ```bash
   python manage.py runserver
   ```

### 3. Настройка фронтенда
1. Перейдите в папку с фронтендом:
   ```bash
   cd frontend
   ```

2. Установите зависимости:
   ```bash
   npm install
   ```

3. Запустите сервер разработки:
   ```bash
   npm start
   ```

### 4. Настройка очередей
1. Убедитесь, что Redis работает. Запустите его с помощью команды:
   ```bash
   redis-server
   ```

2. Запустите Celery для обработки асинхронных задач:
   ```bash
   celery -A <название_проекта> worker --loglevel=info
   ```

---

Ссылка на тестовый репозиторий
https://github.com/dikoshs/sploitus_bot.git

## Использование API

Полная документация API доступна по адресу: [http://172.20.10.4:8000/swagger/](http://172.20.10.4:8000/swagger/).

### Примеры запросов:
#### 1. Инициация проверки
**Эндпоинт:** `POST /api/v1/scan`  
**Тело запроса:**
```json
{
    "query": "192.168.1.1"
}
```

#### 2. Получение списка уязвимостей
**Эндпоинт:** `GET /api/v1/vulnerabilities`  
**Пример ответа:**
```json
[
    {
        "id": 1,
        "request": "Ss7",
        "vuln_title": "Exploit for CVE-2022-32862",
        "vuln_date": "2023-09-13",
        "vuln_sample": "Exploit",
        "sploitus_id": "90FFF58A-EDFA-5C1A-B7A4-2FE763FECB06",
        "vulnerability_indicator": 5.5,
        "description": "## https://sploitus.com/exploit?id=90FFF58A-EDFA-5C1A-B7A4-2FE763FECB06\n%PDF-1.5\n%\ufffd\ufffd\ufffd\ufffd\n16 0 obj\n<<\n/Length 972 \n/Filter /FlateDecode\n>>\nstream..mvwmwklrmlermmtbjnjbenbjlkevkjlwmwkjdvnwkjvnwrkjnvkrnvkj.",
        "task_interval": 5,
        "sample": 'Exploit',
        "user": null,
        "vuln_tool": 1
    }
]
```

---

## Технологии

- **Backend**: Django, Aiogram, Django ORM, SQLAlchemy  
- **Frontend**: React  
- **Парсинг**: Selenium  
- **Очереди**: Celery, Redis  
- **СУБД**: PostgreSQL  

---

## Авторы

- **[Сәкен Ермекулы]** — Backend Developer  
- **[Орынбеков Жандарбек]** — Frontend Developer
- **[Серік Диляра]** — Disigner, parser

---

