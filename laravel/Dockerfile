FROM php:8.2-fpm

# Setel direktori kerja
WORKDIR /var/www/html

# Instal ekstensi PHP yang umum dibutuhkan Laravel
RUN apt-get update && apt-get install -y \
    git \
    curl \
    zip \
    unzip \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libzip-dev \
    mariadb-client \
&& docker-php-ext-configure gd --with-freetype --with-jpeg \
&& docker-php-ext-install gd pdo pdo_mysql zip opcache

# Instal Composer (dependency manager PHP)
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Salin file composer.json dan composer.lock
COPY composer.json composer.lock ./

# Instal dependensi (tanpa --dev untuk produksi)
RUN composer install --no-dev --no-scripts --no-autoloader

# Salin sisa kode aplikasi
COPY . .

# Jalankan optimasi Laravel
RUN composer dump-autoload --optimize

# Atur kepemilikan file
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Expose port 9000 untuk PHP-FPM
EXPOSE 9000

# Perintah untuk menjalankan PHP-FPM
CMD ["php-fpm"]
