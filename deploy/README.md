## How to deploy

# basics
yum install git wget vim

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
