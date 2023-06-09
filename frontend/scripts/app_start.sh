#!/bin/bash
cd /home/ec2-user/server/frontend
npm start
pm2 start npm --name "cs-skindle" -- start
pm2 startup
pm2 save
pm2 restart all