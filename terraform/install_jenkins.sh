

#!/bin/bash
sudo yum -y update

echo "Install Java JDK 8"
sudo yum remove -y java
sudo yum remove java-17-amazon-corretto
sudo amazon-linux-extras install java-openjdk11 -y
sudo alternatives --config java

#echo "Install Maven"
#yum install -y maven 

echo "Install git"
yum install -y git

echo "Install Docker engine"
yum update -y
yum install docker -y
#sudo usermod -a -G docker jenkins
#sudo service docker start
sudo chkconfig docker on

echo "Install Jenkins"
sudo yum update –y
sudo wget -O /etc/yum.repos.d/jenkins.repo https://pkg.jenkins.io/redhat-stable/jenkins.repo
sudo rpm --import https://pkg.jenkins.io/redhat-stable/jenkins.io.key
sudo yum upgrade
sudo yum install jenkins -y
sudo usermod -a -G docker jenkins
sudo systemctl enable jenkins
sudo systemctl start jenkins
sudo systemctl status jenkins

