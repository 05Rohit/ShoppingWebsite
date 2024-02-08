
var mongoose = require('mongoose');

mongoose.set('strictQuery',false)
var mongoDBURL = 'mongodb+srv://25rohitkumar:Rohit2512@cluster0.vn8uypl.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(mongoDBURL,).then (()=>{
    console.log('Connection Established to dataBase')

}).catch (err =>console.log(err) );


