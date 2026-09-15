FROM richarvey/nginx-php-fpm:latest

WORKDIR /var/www/html

# Ensure the directory is completely empty for composer create-project
RUN rm -rf /var/www/html/* /var/www/html/.* 2>/dev/null || true

# Create fresh Laravel project in container
RUN composer create-project --prefer-dist laravel/laravel:^11.0 . --no-interaction

# Copy repository custom backend files into Laravel framework structure
COPY app /var/www/html/app
COPY database /var/www/html/database
COPY bootstrap /var/www/html/bootstrap
COPY routes /var/www/html/routes
COPY config /var/www/html/config
COPY ca-cert.pem /var/www/html/ca-cert.pem
# IMPORTANT: COPY public contents directly into the public folder
COPY public/ /var/www/html/public/

# Copy custom Nginx configuration over default sites
COPY nginx.conf /etc/nginx/sites-available/default.conf
COPY nginx.conf /etc/nginx/sites-enabled/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

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
