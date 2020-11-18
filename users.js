'use strict';
const model = require('./model/models')
module.exports = function(model){

    const newUser = function(req, res, next){

        var newUser = req.body;
        model.ApiTrophs.create({
            name : newUser.name,
            email : newUser.email,
            password : newUser.password
        }, function(err, newData){
            if(err){
                if(err.code === 11000){    
                }
                else{
                    return next(err)
                }
            }
            res.send(newData)
        });
    }

    return{
        newUser
    }
}