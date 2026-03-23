# Use the ultra-lightweight Nginx Alpine image
FROM nginx:alpine

# Remove default Nginx files
RUN rm -rf /usr/share/nginx/html/*

# Copy your local project files into the container
# This includes index.html, the _src folder, and the game folder
COPY . /usr/share/nginx/html

# Nginx runs on port 80 by default
EXPOSE 80
