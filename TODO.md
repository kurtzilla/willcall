
Move /db/knex.js to config dir

Refactor User/Account/Member/Customer
- add a usertype col?
- migrations
- seeds?

Add Member_Stripe table to store stripe data

Create a page to handle stripe webhooks

Implement app logging



## Steps to complete boilerplate
create a db

#### Social auth
I have included google plus for the initial setup
Setup keys and secrets for social providers - see http://megaboilerplate.com
    for more info and instructions. Also include origins for heroku
=================================================
Define a .env (be sure to add .env to .gitignore) with the following keys:
NODE_ENV=[development]
DATABASE_URL=[your local db]
HOST=[your dev url + port]

EMAIL_CONTACT=[your email]
MAILGUN_USERNAME=[your mailgun username]
MAILGUN_PASSWORD=[your mailgun password]

TOKEN_SECRET=[65 char token key]

GOOGLE_CLIENT=[your google client id for the app]
GOOGLE_SECRET=[your google app secret]

===========================================

The google client id will also need to be inserted into the clientid in 
    public/js/app.js. You will also need to do this for any other social 
    providers
=======================================================================

create a heroku project and also populate these keys there
add heroku postgres add on - this will generate a DATABASE_URL key automaticlly
running the project at heroku will run migrations automatically - see 
    config/bookshelf.js to enable/disable #knex.migrate.latest();
DATABASE_URL=postgres://zkfembjvmuevyi:Z1aUrPiNDfA404j8QOCpCFNTD0@ec2-54-243-203-87.compute-1.amazonaws.com:5432/d3oo0sh6lci16d

===========================================

Decide if you want to use bootstrap or material. Simply comment lines 
    appropriate lines out of public/index.html
Sass --watch commands:
bootstrap
sass --watch public/css/mainBs.scss:public/css/mainBs.css
material
sass --watch public/css/mainMd.scss:public/css/mainMd.css

===========================================

You will probably want to remove public/js/services/api.js - I kept it 
    here to test initial routing
    
===========================================    
Use this link for Session Key (and others) generation
node -e "require('crypto').randomBytes(48, function(ex, buf) { console.log(buf.toString('hex')) });"

C3AEC4626EC09A666BCF35EC2D444F4B8972D0ED25D4D7EB3EBF20062B9F4DEB
ff84cf765fb4a5d468af972953d78527f4f9ac08f5d4836a63978fc1b3f3a31004a0eb53efcd018429a4bac87266225d