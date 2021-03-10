#!/bin/bash

cd /home/ec2-user/Capstone-WebApp

pm2 start app.js --name pivotcare-back-end

cd /home/ec2-user/Capstone-WebApp/front-end

pm2 serve build/ 5000 --name pivotcare-front-end --spa

sudo service nginx restart