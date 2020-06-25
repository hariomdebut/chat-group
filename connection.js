const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var config = require('./config/config')
mongoose.set('debug', config.env.database.debug);

const options = {
    useNewUrlParser: true,
    autoIndex: false,
    useUnifiedTopology: true
};

class DB {
    static connect() {
        // mongoose runs on 27017 port
        mongoose.connect(config.env.database.url + ':' + config.env.database.port + '/'+ config.env.database.name, options, function(err, db) {
            if (err) {
                console.log('Unable to connect to the mongoDB server. Error:', err);
            } else {
                console.log('Connected to ' + config.env.database.name);
            }
        });
    }
}

module.exports = DB;