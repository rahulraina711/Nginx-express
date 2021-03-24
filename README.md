# Node.js Deployment

## 1. Clone your project from Github
There are a few ways to get your files on to the server, I would suggest using Git
```
git clone https://github.com/rahulraina711/Nginx-express.git
```

### 2. Install dependencies and test app
```
cd Nginx-express
npm install
node server.js
# stop app
ctrl+C
```
## 3. Setup PM2 process manager to keep your app running
```
sudo npm i pm2 -g
pm2 start app (or whatever your file name)

# Other pm2 commands
pm2 show app
pm2 status
pm2 restart app
pm2 stop app
pm2 logs (Show log stream)
pm2 flush (Clear logs)

# To make sure app starts when reboot (not necessary if you are doing it locally on your machine)
pm2 startup ubuntu
```
### You should now be able to access your app using your IP and port. Now we want to setup a firewall blocking that port and setup NGINX as a reverse proxy so we can access it directly using port 80 (http)

## 4. Setup ufw firewall
```
sudo ufw enable
sudo ufw status
sudo ufw allow ssh (allows Port 22)
sudo ufw allow http (allows Port 80)
sudo ufw allow https (allows Port 443)
```

## 5. Install NGINX and configure
```
sudo apt install nginx

sudo nano /etc/nginx/sites-available/default
```
Add the following to the location part of the server block
```
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:5000; #whatever port your app runs on
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
```
```
# Check NGINX config
sudo nginx -t

# Restart NGINX
sudo service nginx restart
```

### You should now be able to visit your IP with no port (port 80) and see your app. Now let's add a domain

