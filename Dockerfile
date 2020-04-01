FROM node:12-alpine

WORKDIR /app

COPY package.json ./

COPY yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

# Add crontab file in the cron directory
ADD crontab /etc/cron.d/start-jexam-check

# Give execution rights on the cron job
RUN chmod +x /etc/cron.d/start-jexam-check

# Apply cron job
RUN crontab /etc/cron.d/start-jexam-check

CMD crond -f -L /dev/stdout
