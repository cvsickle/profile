FROM nginx:1.30-alpine

# Remove default nginx site config and content
RUN rm -rf /usr/share/nginx/html/* /etc/nginx/conf.d/default.conf

# Copy site files (profile picture baked in)
COPY site/ /usr/share/nginx/html/

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Entrypoint that optionally overlays an external links.json
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# Non-root friendly permissions
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R a+rX /usr/share/nginx/html

EXPOSE 8080

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]