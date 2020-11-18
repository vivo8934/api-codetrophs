 'use strict';
const mongoose = require('mongoose');
module.exports = function(mongoUrl){
mongoose.Promise = global.Promise

mongoose.connection.on('error', function(err){
    console.log(err);
  })
  mongoose.connect(mongoUrl);


const apiSchema = mongoose.Schema({
  name : String,
  email : String,
  password : String
});

apiSchema.index({
    name : '',
    email : '',
    password : ''
  },
  {unique:true});


  const ApiTrophs = mongoose.model('ApiTrophs', apiSchema);

return{
    ApiTrophs
};

}