require('dotenv').config();
const http = require('http');
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
	res.send('Welcome to Kliq');
});

app.post('/cmd', (req, res) => {
	const twiml = new MessagingResponse();

	let msg = req.body;
	console.log(msg);
	switch (msg) {
		case process.env.CMD_START:
			twiml.message(
				`
					Thank you for choosing Kliq! I'm KC and I'll be helping you with all your 
					planning needs. Please tell me what you'd like to be called using the following 
					format (Eg. @Lindsay, @Ed), or, send Cancel to exit.
				`
			);
			break;
		case process.env.CMD_JOIN:
			twiml.message(`Thank you for accepting the invitation! Your fellow group members will be notified.`);
			break;
		case process.env.CMD_EXIT:
			twiml.message(`Thank you for choosing Kliq. You will now be removed from any active groups.`);
			break;
		default:
			twiml.message('Command Not Recognised');
	}

	res.writeHead(200, {'Content-Type': 'text/xml'});
	res.end(twiml.toString());
});

app.post('/invite', (req, res) => {
	const twiml = new MessagingResponse();

	let msg = req.body;

	if (msg != '') {
		twiml.message(`Invites have been sent out to the following numbers ${msg}`);
	} else {
		twiml.message(`It seems the message you sent was empty. Please resend with a list of numbers`);
	}

	res.writeHead(200, {'Content-Type': 'text/xml'});
	res.end(twiml.toString());
});

http.createServer(app).listen(1337, () => {
	console.log('Express server listening on port 1337');
});