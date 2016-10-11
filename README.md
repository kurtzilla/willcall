# Will Call Tickets

### Steps to setup:
* Create a postgres database and setup default connection at knexfile.js 
* Create a .env file 
* Set up .env vars  
```
NODE_ENV=development  
DATABASE_URL=  
HOST=localhost:3000  
EMAIL_CONTACT=  
MAILGUN_USERNAME=  
MAILGUN_PASSWORD=  
TOKEN_SECRET=  
GOOGLE_CLIENT=  
GOOGLE_SECRET=  
STRIPE_SECRET=  
STRIPE_PUBLISH=  
STRIPE_CLIENT_ID=  
STRIPE_TOKEN_URL=  
SESSION_KEY1=  
SESSION_KEY2=  
SESSION_KEY3=  
```

### Key generator helper
node -e "require('crypto').randomBytes(48, function(ex, buf) { console.log(buf.toString('hex')) });"

### Steps for database migration and seeding
* knex run migrate:latest
* knex run seed:run
