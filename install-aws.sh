#!/bin/bash

sleep 30

sudo yum update -y

curl -sL https://rpm.nodesource.com/setup_16.x | sudo -E bash -
sudo yum install -y nodejs


sudo amazon-linux-extras install epel -y 
sudo yum install https://dev.mysql.com/get/mysql80-community-release-el7-5.noarch.rpm -y
sudo yum install mysql-community-server -y
sudo systemctl start mysqld.service


# To get the temporary password
# sudo cat /var/log/mysqld.log | grep "A temporary password"  

# Storing it to the mysql_password.txt
# sudo cat /var/log/mysqld.log | grep "A temporary password" | awk -F ' ' '{print $NF}' > mysql_password.txt

# To print the last line of password
# awk -F ' ' '{print $NF}' mysql_password.txt


# export MySQL_Password=awk -F ' ' '{print $NF}' mysql_password.txt

# export ext=$(awk -F ' ' '{print $NF}' mysql_password.txt)


export temp=$(sudo cat /var/log/mysqld.log | grep "A temporary password" | awk -F ' ' '{print $NF}')

export DB_DATABASE=DEMO
export DB_USERNAME=root
export DB_PASSWORD=PaSswo#2
export DB_HOST=localhost
export PORT=3002

#sudo mysql -u root -p123a -e  "CREATE DATABASE demo DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;use demo;create user 'db'@'localhost' identified by '123a';  grant all on testdb.* to 'db';GRANT ALL ON db.* TO ' db '@'localhost';GRANT ALL ON db.* TO ' db '@'%';FLUSH PRIVILEGES;" 

# sudo mysql -u root -p$temp --connect-expired-password -e "ALTER USER 'root'@'localhost' IDENTIFIED BY 'Password#2022';CREATE DATABASE DEMO; USE DEMO;create user 'db'@'localhost' identified by '123a';  grant all on testdb.* to 'db';GRANT ALL ON db.* TO ' db '@'localhost';GRANT ALL ON db.* TO ' db '@'%';FLUSH PRIVILEGES;"

sudo mysql -u root -p$temp --connect-expired-password -e "ALTER USER 'root'@'localhost' IDENTIFIED BY 'PaSswo#2';SET GLOBAL validate_password.policy='LOW';SET GLOBAL validate_password.length=5;CREATE DATABASE DEMO;USE DEMO;"

cd /home/ec2-user && unzip ./webapp.zip

npm install

# npm start