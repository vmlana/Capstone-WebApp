#!/bin/bash

cd /home/ec2-user/Capstone-WebApp

cp /home/ec2-user/pivotcare_env/.env /home/ec2-user/Capstone-WebApp/.env

chmod 777 /home/ec2-user/Capstone-WebApp/.env

sudo chown ec2-user /home/ec2-user/Capstone-WebApp/.env

# npm install --production
npm install

cd /home/ec2-user/Capstone-WebApp/front-end

# npm install --production
npm install

npm audit fix

npm run build
