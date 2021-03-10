#!/bin/bash

cd /home/ec2-user/Capstone-WebApp

npm install --production

cp /home/ec2-user/pivotcare_env/.env /home/ec2-user/Capstone-WebApp.env

cd /home/ec2-user/Capstone-WebApp/front-end

npm install --production

npm run build
