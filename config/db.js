process.env.NO_DEPRECATION = 'mongodb';
const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDb = async () => {
	try {
		await mongoose.connect(db, {
			useNewUrlParser : true,
			useNewUrlParser: true
			// strictQuery: false,
		});
		console.log('\x1b[32m%s\x1b[0m', "Connected");
	} catch(err)
	{
		console.log(err.message);
		process.exit(1);
	}
}

module.exports = connectDb;
