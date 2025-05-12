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
    ssl:{
        rejectUnauthorized: true,
        ca: `-----BEGIN CERTIFICATE-----
MIIETTCCArWgAwIBAgIUL/m/XPKMZuH/hEG9rEnyhzkHB9cwDQYJKoZIhvcNAQEM
BQAwQDE+MDwGA1UEAww1YmNlZDI0OTgtZTIyMC00Mzc4LWFiNjUtNWM5NmViNGMx
MmQ4IEdFTiAxIFByb2plY3QgQ0EwHhcNMjUwNTEyMTkzNTUxWhcNMzUwNTEwMTkz
NTUxWjBAMT4wPAYDVQQDDDViY2VkMjQ5OC1lMjIwLTQzNzgtYWI2NS01Yzk2ZWI0
YzEyZDggR0VOIDEgUHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCC
AYoCggGBAI3Lf1geds/ApakqCtam5ektilVY32Q1JLH1KiYKAXC+LdvXkZVCO6x/
NGGhqWsTczNV6NpUGtXwAxf6hw2fcIghQJi77IMe6d8HyHpAmck52Jvz8lz8rDyl
zIo7sR5jDZjBRP8fa4xl+AEZsVirGXl5mnkDRKWFGB3ylrKrmOejjASQq8/XCgK1
x3pT5g/CTWYECtIUZtwdsMzHBqHcQVZlegDJjfEyr2sHheH0QUZdUa21rvus5Dfr
nx7HSUcRtE8OgyUp061GWtloOCx0bS6VHPBNNLst6TcBkv1AQEQ7aFZCom7GONcQ
eDpIaz5iqrYweLaaABmqCetzaEvs01eTgLxiW+6KcWnYIvtc113zGIxL0k+7lF6V
R3BfJKMzi1mxQPkGnMGlxA1EGI+C/G/f9tR/2sr9b5OGSMAwC/DaEp4CInEacCfF
raNlf9k+VKA7aafCsiR6S2GuOGO50uNtHsLYKWfphZFoYDySYSHGkHpTm3Jr8nNO
TePID2VN4wIDAQABoz8wPTAdBgNVHQ4EFgQUSeRqycPeo5xMZHh66l6rjWmjhGkw
DwYDVR0TBAgwBgEB/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGB
AHHWHaYVc08iIvycmaZ5byTVNJSVkWihdWFVPJhpBLAzCsRNL9MIkwuDwSqyReaV
loT90KgNZwiIEH1skalcuz0bXDRvE6FaTT/Jgdtb/5LkupjJchWYVcYN4tmvp8OI
HdHIvp7w5i8pd645bUDKHCLijwkoiWC3Ii7dD/whSMTWeVlXOEznspVQ1eDNCgOZ
N7RNAXmuRFXxTQLjZdttCw1nKq2M5tcfr0AuSI+wvIIWfDJWG9cb0DmQXIHa4Qws
7nUE+H8YyZdwTH0md2z7zMlTn8qUstGM4K97+vIMe5mqFFdhmlHIo2PdfwBjWSQx
M9arGOsTH2zJoldfNnCfp8uuA735tfJKLTOGccZ8Wpt7HgR82Cm55ORnf49H6lqY
yD27gwE5IZjBqphqZS2dNgvn7GEthG5ThKJ1W7jy3SlizDo/AH9ixue34thJPn49
XhgXSMUeU4zDO6bvryqKix/j1sG7covUBhjqAGswhTra09DwtyLLFDtawt3rrn2P
gQ==
-----END CERTIFICATE-----`,
  }
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
