FROM richarvey/nginx-php-fpm:latest

COPY . /var/www/html

ENV WEBROOT /var/www/html/public
ENV PHP_ERRORS_STDERR 1
ENV RUN_SCRIPTS 1
ENV REAL_IP_HEADER 1
ENV ARTISAN_MIGRATE 1
ENV NGINX_SITES_CONF /var/www/html/nginx.conf

# Ensure storage and bootstrap/cache directories exist before setting permissions
RUN mkdir -p /var/www/html/storage/framework/views \
             /var/www/html/storage/framework/sessions \
             /var/www/html/storage/framework/cache \
             /var/www/html/storage/logs \
             /var/www/html/bootstrap/cache && \
    chmod -R 777 /var/www/html/storage /var/www/html/bootstrap/cache

EXPOSE 80
