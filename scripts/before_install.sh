#!/bin/bash

# Kill node all node process
sudo killall node

# Delete previous project
rm -rf /home/ec2-user/Capstone-WebApp/

# Update serve command to run react project
sudo npm install -g serve