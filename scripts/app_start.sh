#!/bin/bash

cd /home/ec2-user/Capstone-WebApp

pm2 start app.js --name pivotcare-back-end

cd /home/ec2-user/Capstone-WebApp/front-end

pm2 serve -s build --name pivotcare-front-end

sudo service nginx restart