# Lumves CRM - VPS Deployment Guide

## Server Information
- **Server IP**: 84.247.136.87
- **Domain**: crm.lumves.com
- **OS**: Ubuntu 22.04 LTS

---

## Manual Deployment Steps

### Step 1: SSH into the VPS

```bash
ssh sunny@84.247.136.87
```

### Step 2: Verify Files are Uploaded

The following files should be in `/home/sunny/`:
- `lumves-crm-deploy.tar.gz` - Project files
- `lumves-crm-setup.sh` - Setup script

```bash
ls -la ~/
```

### Step 3: Run the Setup Script

```bash
chmod +x ~/lumves-crm-setup.sh
sudo bash ~/lumves-crm-setup.sh
```

This script will:
1. Update system packages
2. Install Node.js 20.x
3. Install MySQL Server
4. Install Nginx
5. Install PM2 (process manager)
6. Extract and set up the application
7. Configure the database
8. Build the frontend and backend
9. Start the application with PM2

---

## Manual Setup (If Script Fails)

### Install Dependencies

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install MySQL
sudo apt install -y mysql-server

# Install Nginx
sudo apt install -y nginx

# Install PM2
sudo npm install -g pm2
```

### Setup Application

```bash
# Create app directory
sudo mkdir -p /var/www/lumves-crm
sudo chown -R $USER:$USER /var/www/lumves-crm

# Extract files
cd /var/www/lumves-crm
tar -xzf ~/lumves-crm-deploy.tar.gz

# Setup MySQL
sudo mysql -e "CREATE DATABASE IF NOT EXISTS lumves_crm;"
sudo mysql -e "CREATE USER IF NOT EXISTS 'lumves_user'@'localhost' IDENTIFIED BY 'LumvesCRM2024!';"
sudo mysql -e "GRANT ALL PRIVILEGES ON lumves_crm.* TO 'lumves_user'@'localhost';"
sudo mysql -e "FLUSH PRIVILEGES;"
```

### Create Server Environment File

```bash
cat > /var/www/lumves-crm/server/.env << 'EOF'
PORT=5000
NODE_ENV=production

DB_HOST=localhost
DB_PORT=3306
DB_NAME=lumves_crm
DB_USER=lumves_user
DB_PASSWORD=LumvesCRM2024!

JWT_SECRET=lumves-crm-production-secret-key-change-this-12345
JWT_EXPIRES_IN=24h

CORS_ORIGIN=http://84.247.136.87
EOF
```

### Install and Build

```bash
# Backend
cd /var/www/lumves-crm/server
npm install
npm run build

# Frontend
cd /var/www/lumves-crm/client
npm install
npm run build

# Seed database
cd /var/www/lumves-crm/server
npm run seed
```

### Configure Nginx

```bash
sudo tee /etc/nginx/sites-available/lumves-crm > /dev/null << 'EOF'
server {
    listen 80;
    server_name 84.247.136.87 crm.lumves.com;

    root /var/www/lumves-crm/client/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_cache_bypass $http_upgrade;
    }

    gzip on;
    gzip_types text/plain text/css application/json application/javascript;
}
EOF

sudo ln -sf /etc/nginx/sites-available/lumves-crm /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx
```

### Start Application

```bash
cd /var/www/lumves-crm/server
pm2 start dist/app.js --name lumves-crm
pm2 save
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u $USER --hp /home/$USER
```

---

## Accessing the Application

After deployment, access the CRM at:
- **URL**: http://84.247.136.87
- **Domain** (after DNS setup): https://crm.lumves.com

### Default Login Credentials

| Role    | Email                  | Password    |
|---------|------------------------|-------------|
| Admin   | admin@lumves.com       | admin123    |
| Manager | manager@lumves.com     | manager123  |
| Agent   | agent@lumves.com       | agent123    |

---

## Useful Commands

```bash
# View application logs
pm2 logs lumves-crm

# Restart application
pm2 restart lumves-crm

# Stop application
pm2 stop lumves-crm

# View PM2 status
pm2 status

# Reload Nginx
sudo systemctl reload nginx

# View Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

---

## Setting Up SSL (Optional)

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Get SSL certificate (after DNS is configured)
sudo certbot --nginx -d crm.lumves.com
```

---

## Database Credentials

- **Database**: lumves_crm
- **User**: lumves_user
- **Password**: LumvesCRM2024!

---

## Troubleshooting

### Application not starting
```bash
cd /var/www/lumves-crm/server
pm2 logs lumves-crm --lines 50
```

### Database connection error
```bash
mysql -u lumves_user -p lumves_crm
# Enter password: LumvesCRM2024!
```

### Nginx issues
```bash
sudo nginx -t
sudo systemctl status nginx
```
