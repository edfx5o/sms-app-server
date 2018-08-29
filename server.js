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

app.post('/sms', (req, res) => {
	const twiml = new MessagingResponse();

	//twiml.message('RESPONSE');
	let msg = req.body.Body;
	console.log(msg);
	// switch (msg) {
	// 	case process.env.CMD_START:
	// 		twiml.message(`Thank you for choosing Kliq! I'm K.C. and I'll be helping you with all your planning needs. To begin, what should I call you?`);
	// 		break;
	// 	default:
	// 		twiml.message('Command Not Recognised');
	// }

	res.writeHead(200, {'Content-Type': 'text/xml'});
	res.end(twiml.toString());
});

http.createServer(app).listen(1337, () => {
	console.log('Express server listening on port 1337');
});