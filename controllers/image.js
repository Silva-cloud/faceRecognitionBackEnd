const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));
// const fetch = require('node-fetch');

const USER_ID = 'silva';
// Your PAT (Personal Access Token) can be found in the portal under Authentification
const PAT = '7378de56a36c4c0e86ee95835d4a5633';
const APP_ID = 'my-first-application';
// Change these to whatever model and image URL you want to use
const MODEL_ID = 'face-detection';
const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';    
const IMAGE_URL = 'https://samples.clarifai.com/metro-north.jpg';


const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": IMAGE_URL
                    }
                }
            }
        ]
    });

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT
        },
        body: raw
    };
const handleApiCall = (req,res)=>{

	let raw2=requestOptions.body;
       let rawNJ=JSON.parse(raw2);
       rawNJ.inputs[0].data.image.url=req.body.input;
       const newRaw= JSON.stringify(rawNJ);
       requestOptions.body=newRaw;

	fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", requestOptions)
	.then(data => {
		data.text()
		.then(textPromiseResult=> res.json(textPromiseResult));
		//this is the reason that we
		//added resp.json before response.text() in the
		//front end 
		//here we are receiving response from clarafai 
		//that we can read by converting to response.text()
		//but we don't want to read but to send it
		//so we send it using res.json to the front end
		//which will cause it to be send in a stringified
		//json format
		//thus when received on front end it is our 
		//post /image response (in json stringified format)
		//we have to first convert it back from json format
		//and the result is the original answer of the clarafai api
		//then convert the original answer to text() in order to 
		//use it as usual
	})
	.catch(err => res.status(400).json('unable to work with api'));

}



const handleEntries=(req,res,database)=>{
	const {id} = req.body;
	database('users').where('id', '=', id)
	.increment('entries',1)
	// .returning('entries')
	.returning('*')//this is z modified because of the object.assign delaying issue(I had to click twice for udating entries issue)
	.then(entries => {
		console.log(entries);
		res.json(entries[0]);
	})
	.catch(err=> res.status(400).json('unable to get entries'))


	// database('users').where('id', '=', id)
	// .increment('entries', 10)
	// .then()

	// database('users').where('id', '=', id)
	// .increment('entries', 10)
	// .catch(err=> res.jason('booya'))


};

module.exports ={
	handleEntries,
	handleApiCall
}