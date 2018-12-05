var mongoose = require('mongoose');
var log = require('./log')(module);
var config = require('../config.json');

mongoose.connect(config.mongo.uri, {useMongoClient: true});
var db = mongoose.connection;

db.on('error', function (err) {
    log.error('connection error:', err.message);
});
db.once('open', function callback () {
    log.info('Connected to DB!');
});

var Schema = mongoose.Schema;

// Schemas
var Images = new Schema({
    uri: { type: String, required: true }
});// Schemas
var Thumbnail = new Schema({
    uri: { type: String, required: true }
});

var Wine = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    country: { type: String, required: true },
    year: { type: Number, required: true },
    type: { type: String, required: true },
    desc: { type: String },
    image: { type: Images, required: true },
    thumbnail: { type: Thumbnail, required: true },
    available: { type: Number, required: true }
});

var User = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    dob: { type: String },
    gender: { type: String },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    street: { type: String },
    zip: { type: String },
    city: { type: String },
    country: { type: String },
    isAdmin: { type: Boolean },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date }
});

var Order = new Schema({
    userId: { type: String, required: true },
    items: [
        {
            itemId: { type: String, required: true },
            quantity: { type: Number, required: true },
            details: { type: Wine }
        }
    ],
    address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        country: { type: String, required: true },
        zip: { type: String, required: true },
        phone: { type: String, required: false },
        email: { type: String, required: true }
    },
    totalSum: { type: Number, required: true }
});

module.exports.WineModel = mongoose.model('Wines', Wine);
module.exports.ImageModel = mongoose.model('Images', Images);
module.exports.ThumbnailModel = mongoose.model('Thumbnail', Thumbnail);
module.exports.UserModel = mongoose.model('User', User);
module.exports.OrderModel = mongoose.model('Order', Order);