# Installation

-php artisan storage:link


**Первый запуск (с миграциями и сидером):**

```bash
docker-compose up -d --build
docker-compose run --rm app php artisan migrate --seed
docker-compose exec app php artisan storage:link
```

**Повторный запуск (если БД уже инициализирована):**

```bash
docker-compose up -d
```
