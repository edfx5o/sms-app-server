require('dotenv').config();
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);

client.messages.create({
	to: process.env.MY_MOBILE,
	from: process.env.TWILIO_CONTACT,
	body: "Some Message 2"
})
.then((message) => console.log(message.sid));