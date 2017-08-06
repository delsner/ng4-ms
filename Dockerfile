FROM node:7 as builder

# set up angular cli
RUN npm install -g @angular/cli@1.2.7

WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app

# create dist
RUN ng build

FROM nginx
COPY nginx.conf /etc/nginx/nginx.conf # optional: add nginx config to reverse proxy /api calls to backend
COPY --from=builder /app/dist /usr/share/nginx/html
