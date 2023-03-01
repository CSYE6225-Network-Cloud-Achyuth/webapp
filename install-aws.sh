#!/bin/bash

sleep 30

# export DB_DATABASE=USER
# export DB_USERNAME=root
# export DB_PASSWORD=PaSswo#2
# export DB_HOST=localhost
# export PORT=3002

# touch ~/.bash_profile
# echo -e "export DB_DATABASE=USER\nexport DB_USERNAME=root\nexport DB_PASSWORD=PaSswo#2\nexport DB_HOST=localhost\nexport PORT=3002" > ~/.bash_profile
# source ~/.bash_profile

sudo yum update -y

sudo yum upgrade -y

curl -sL https://rpm.nodesource.com/setup_16.x | sudo -E bash -
sudo yum install -y nodejs

# Installing and starting MySQL Service
sudo amazon-linux-extras install epel -y 
# sudo yum install https://dev.mysql.com/get/mysql80-community-release-el7-5.noarch.rpm -y
# sudo yum install mysql-community-server -y
# sudo systemctl start mysqld.service

# Installing NGINX and Starting it
sudo yum install nginx -y



# To get the temporary password
# sudo cat /var/log/mysqld.log | grep "A temporary password"  

# Storing it to the mysql_password.txt
# sudo cat /var/log/mysqld.log | grep "A temporary password" | awk -F ' ' '{print $NF}' > mysql_password.txt

# To print the last line of password
# awk -F ' ' '{print $NF}' mysql_password.txt


# export MySQL_Password=awk -F ' ' '{print $NF}' mysql_password.txt

# export ext=$(awk -F ' ' '{print $NF}' mysql_password.txt)


# export temp=$(sudo cat /var/log/mysqld.log | grep "A temporary password" | awk -F ' ' '{print $NF}')

# export DB_DATABASE=USER
# export DB_USERNAME=root
# export DB_PASSWORD=PaSswo#2
# export DB_HOST=localhost
# export PORT=3002

#sudo mysql -u root -p123a -e  "CREATE DATABASE demo DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;use demo;create user 'db'@'localhost' identified by '123a';  grant all on testdb.* to 'db';GRANT ALL ON db.* TO ' db '@'localhost';GRANT ALL ON db.* TO ' db '@'%';FLUSH PRIVILEGES;" 

# sudo mysql -u root -p$temp --connect-expired-password -e "ALTER USER 'root'@'localhost' IDENTIFIED BY 'Password#2022';CREATE DATABASE DEMO; USE DEMO;create user 'db'@'localhost' identified by '123a';  grant all on testdb.* to 'db';GRANT ALL ON db.* TO ' db '@'localhost';GRANT ALL ON db.* TO ' db '@'%';FLUSH PRIVILEGES;"


# sudo mysql -u root -p$temp --connect-expired-password -e "ALTER USER 'root'@'localhost' IDENTIFIED BY 'PaSswo#2';CREATE DATABASE USER;USE USER;"
# cd /home/ec2-user && unzip ./webapp.zip

# chmod -R 700 .

# npm install

sudo mv /tmp/nginx.conf /etc/nginx/nginx.conf

# sudo mv /tmp/webapp.service /etc/systemd/system/webapp.service

# sudo systemctl enable webapp.service
# sudo systemctl start webapp.service
# sudo systemctl restart nginx
