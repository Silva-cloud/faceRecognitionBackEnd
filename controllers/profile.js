const handleProfileGet= (req,res,database)=>{
	const {id} = req.params;
	// let found=false;


	// db.users.forEach(user=>{
	// 	if(user.id === id){
	// 		found =true;
	// 		return res.json(user);
	// 	}
	// 	});

	database.select('*').from('users').where({id})
	.then(user => {
		console.log(user);
		if(user.length)
			res.json(user[0]);
		else
			res.status(400).json('not found');
	}
		)
	


	// if(!found)
	// 	res.status(400).json('not found');
};

module.exports ={
	handleProfileGet:handleProfileGet
};