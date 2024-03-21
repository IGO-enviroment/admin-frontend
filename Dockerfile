FROM node:21-alpine3.18 AS builder
# Add a work directory
WORKDIR /app
# Cache and Install dependencies
COPY package.json .
# Copy app file
COPY . .
RUN npm i
# Build the app
RUN cd ./services/host && npm run build:prod

# Bundle static assets with nginx
FROM nginx:1.21.0-alpine AS production
# Copy built assets from builder
COPY --from=builder /app/services/host/build /usr/share/nginx/html
# Add your nginx.conf
COPY ./infra/nginx.conf /etc/nginx/conf.d/default.conf
# Expose port
EXPOSE 3005
# Start nginx
CMD ["nginx", "-g", "daemon off;"]
