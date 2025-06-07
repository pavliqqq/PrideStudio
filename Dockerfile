FROM php:8.2-fpm
RUN apt-get update && apt-get install -y \
    build-essential \
    zip unzip curl git libzip-dev libpng-dev libjpeg-dev libfreetype6-dev libonig-dev libxml2-dev \
    && docker-php-ext-install pdo pdo_mysql mbstring zip exif pcntl bcmath gd
COPY --from=composer:2.8 /usr/bin/composer /usr/bin/composer
WORKDIR /var/www
COPY . .
RUN composer install --no-dev --optimize-autoloader
RUN chown -R www-data:www-data /var/www \
    && chmod -R 755 /var/www
CMD ["php-fpm"]
