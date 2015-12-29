var Util = require('util'),
    Async = require('async'),
    Mongoose = require('mongoose'),
    Schema = Mongoose.Schema,
    MongooseDbInstance = Mongoose.createConnection('mongodb://localhost:27017/playground');

var Person = MongooseDbInstance.model('Person', Schema({
    name: String,
    age: Number
}), 'persons');

var persons = [
    {name: 'Meki', age: 29},
    {name: 'Friend', age: 27},
    {name: 'Tipper', age: 119},
    {name: 'Blabber', age: 319},
    {name: 'Trickster', age: 119}
];

Async.each(persons, function (person, callback) {
    Person.create(person, callback);
}, function (err) {
    if (err) {
        return console.log(err);
    }

    var agg = Person.aggregate();
    agg.append([{$match: {age: {$gt: 30}}}, {$match: {name: /ster$/i}}]);

    agg.exec(function (e, d) {
        console.log(Util.inspect(e || d, {depth: 10}));
    });
});
