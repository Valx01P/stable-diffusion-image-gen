FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf.template

# Copy built assets
COPY --from=build /app/dist /usr/share/nginx/html

# Add bash for the entrypoint script
RUN apk add --no-cache bash

# Create entrypoint script to substitute env vars in nginx config
RUN echo '#!/bin/bash\n\
envsubst "\$BACKEND_API_URL" < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf\n\
nginx -g "daemon off;"' > /docker-entrypoint.sh

RUN chmod +x /docker-entrypoint.sh

EXPOSE 80

CMD ["/docker-entrypoint.sh"]