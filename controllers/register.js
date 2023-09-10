const handleRegister=(req,res,database,bcrypt)=>{
	const {email , name , password} = req.body;

	if(!email || !name || !password){
		return res.status(400).json("incorrect form submission");
	}


	const hash= bcrypt.hashSync(password);

	// bcrypt.compareSync(password,hash);
	// bcrypt.compareSync("veggies",hash);


	database.transaction(trx =>{
		// console.log(email)
		trx.insert({
			hash: hash,
			email:email
		})
		.into('login')
		.returning('email')
		.then(loginEmail=>{

		console.log(loginEmail);	
		return trx('users')
		.returning('*')
		.insert({
			email:loginEmail[0].email,
			name: name,
			joined:new Date()
		}).then(resp => {	//returning the user
			
			res.json(resp[0]);
		})
		
		// res.json(db.users[db.users.length-1]);
		}).then(trx.commit)
	.catch(trx.rollback);

	})
	.catch(err => res.status(400).json(err + '\n the previous is bad so I should delte it and say unable to register'));
}

module.exports = {

	handleRegister:handleRegister

};