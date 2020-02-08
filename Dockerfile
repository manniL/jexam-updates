FROM node:12

WORKDIR /app

COPY package.json ./

COPY yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

RUN apt-get update -qq && apt-get -y install -qq --force-yes cron
# Add crontab file in the cron directory
ADD crontab /etc/cron.d/start-jexam-check

# Give execution rights on the cron job
RUN chmod +x /etc/cron.d/start-jexam-check

# Create the log file to be able to run tail
RUN touch /var/log/cron.log

# Run the command on container startup
RUN cron && tail -f /var/log/cron.log
