FROM richarvey/nginx-php-fpm:1.10.4

# Set working directory to temporary build location
WORKDIR /tmp/laravel-build

# Create fresh Laravel project in container
RUN composer create-project --prefer-dist laravel/laravel:^11.0 . --no-interaction

# Copy repository custom backend files into Laravel framework structure
COPY app /tmp/laravel-build/app
COPY database /tmp/laravel-build/database
COPY routes /tmp/laravel-build/routes
COPY config /tmp/laravel-build/config
COPY public /tmp/laravel-build/public

# Move complete Laravel application to /var/www/html
RUN rm -rf /var/www/html/* && \
    cp -r /tmp/laravel-build/* /tmp/laravel-build/.* /var/www/html/ 2>/dev/null || true

# Copy custom Nginx configuration over default sites after file copy
COPY nginx.conf /etc/nginx/sites-available/default.conf
COPY nginx.conf /etc/nginx/sites-enabled/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /var/www/html

ENV WEBROOT /var/www/html/public
ENV PORT 80
ENV PHP_ERRORS_STDERR 1
ENV RUN_SCRIPTS 1
ENV REAL_IP_HEADER 1
ENV ARTISAN_MIGRATE 1
ENV ARTISAN_SEED 1

# Ensure permissions for Laravel storage and cache
RUN mkdir -p /var/www/html/storage/framework/views \
             /var/www/html/storage/framework/sessions \
             /var/www/html/storage/framework/cache \
             /var/www/html/storage/logs \
             /var/www/html/bootstrap/cache && \
    chmod -R 777 /var/www/html/storage /var/www/html/bootstrap/cache

EXPOSE 80
