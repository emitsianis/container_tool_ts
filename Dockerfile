FROM node:alpine

WORKDIR /usr/src/app

RUN npm i -g @angular/cli

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]