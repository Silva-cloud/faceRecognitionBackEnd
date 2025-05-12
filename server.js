const exp = require('express');
const bcrypt= require('bcrypt-nodejs');
const cors= require('cors');
const register = require('./controllers/register');
const sign= require('./controllers/signin.js');
const profile= require('./controllers/profile.js');
const image= require('./controllers/image.js');
const knex= require('knex');
;// const knex= require('knex')({
//   client: 'mysql',
//   connection: {
//     host : '127.0.0.1',
//     port : 3306,
//     user : 'your_database_user',
//     password : 'your_database_password',
//     database : 'myapp_test'
//   }
// });

console.log({host : process.env.DBHost,
    port : process.env.DBPort,
    user : process.env.DBUser,
    password : process.env.DBPass,
    database : process.env.DBName})

const database= knex({
  client: 'pg',
  connection: {
    host : process.env.DBHost,
    port : process.env.DBPort,
    user : process.env.DBUser,
    password : process.env.DBPass,
    database : process.env.DBName,
  	 ssl: {
      rejectUnauthorized: false
    }}
});

database.select('*').from('users').then(data =>{
	// console.log(data);
});
//




const app = exp();
app.use(exp.json());
app.use(cors());

app.get('/',(req,res)=>{
	res.send('success');
});

app.listen(process.env.PORT ||3001,()=>{

	console.log(`app is runiing on port ${process.env.PORT || 3001}`)

});

app.post('/signin',(req,res)=>{sign.handleSignin(req,res,database,bcrypt)});

app.post('/register',(req,res)=>{register.handleRegister(req,res,database,bcrypt)})



app.get('/profile/:id',(req,res)=>{profile.handleProfileGet(req,res,database)});

app.put('/image',(req,res)=>{image.handleEntries(req,res,database)});

app.post('/image',(req,res)=>{image.handleApiCall(req,res)});





/*
/ -->res =this is working
/signin --> post (because we are posting data (json))
		--> post should response by success/fail

/register --> post = user (returning the user that was created)

/profile/:userId -->(userId or any thing like this form

/:xxx  is called optional parameter 
				--> Get = user

/image --> put --> user (updating the rank property of user or
what ever variable that we could use)

*/
