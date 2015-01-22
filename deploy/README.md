## How to deploy

# basics
yum install git wget vim

# install redis
(http://sharadchhetri.com/2014/10/04/install-redis-server-centos-7-rhel-7/)

wget -r --no-parent -A 'epel-release-*.rpm' http://dl.fedoraproject.org/pub/epel/7/x86_64/e/
rpm -Uvh dl.fedoraproject.org/pub/epel/7/x86_64/e/epel-release-*.rpm

yum install redis
systemctl start redis

# install mongodb
(http://www.liquidweb.com/kb/how-to-install-mongodb-on-centos-7/)
vim /etc/yum.repos.d/mongodb.repo
    [mongodb]
    name=MongoDB Repository
    baseurl=http://downloads-distro.mongodb.org/repo/redhat/os/x86_64/
    gpgcheck=0
    enabled=1

yum -y install mongodb-org
systemctl start mongod

# install nodejs
curl -sL https://rpm.nodesource.com/setup | bash -
yum install -y nodejs

# clone ats
git clone git@github.com:CoffeeTheApp/ats.git

# setup ats service
cd ats/deploy
cp coffee-ats.service /etc/systemd/system
systemctl daemon-reload
systemctl start coffee-ats

# tail logs
journalctl -u coffee-ats -f

# redeploy changes
systemctl restart coffee-ats
