const passport = require('passport');
var JWTStrategy = require('passport-jwt').Strategy;
var ExtractJWT = require('passport-jwt').ExtractJwt;
var User = require('../models/userinfoModel');

module.exports = function(passport) {
    var opts = {};
    opts.jwtFromRequest = ExtractJWT.fromAuthHeaderWithScheme("jwt");
    opts.secretOrKey = 'gaandfaad';
    passport.use(new JWTStrategy(opts,function(jwt_payload, done) {
        User.findOne({
            id: jwt_payload.id
        },function(err,user) {
            if(err) {
                return done(err, false);
            }
            if(user) {
                console.log('User authenticated');
                done(null,user);
            }
            else {
                done(null, false);
            }
        });
    }));
};