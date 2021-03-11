#!/bin/bash

cd /home/ec2-user/Capstone-WebApp

# Copy .env file
cp /home/ec2-user/pivotcare_env/.env /home/ec2-user/Capstone-WebApp/.env

# Change mode of .env
chmod 777 /home/ec2-user/Capstone-WebApp/.env

# Change owner of .env
sudo chown ec2-user /home/ec2-user/Capstone-WebApp/.env

# npm install --production
npm install

cd /home/ec2-user/Capstone-WebApp/front-end

# npm install --production
npm install

npm audit fix

sudo npm run build
