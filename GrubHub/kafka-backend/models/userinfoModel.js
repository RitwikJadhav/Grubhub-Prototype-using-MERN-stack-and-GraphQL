const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userinfoSchema = new mongoose.Schema({
     _id: mongoose.Schema.Types.ObjectId,
     FirstName: String,
     LastName : String,
     Email : {
          type : String,
          required : true,
          index : { unique : true}
     },
     Password : {
          type : String
     },
     Address : String,
     RestaurantName : String,
     RestaurantZipCode : String,
     role: String,
     Cuisine : String,
     PhoneNumber : String
}) 

userinfoSchema.pre('save', function(next) {
     var user = this;
     if(!user.isModified('Password')) {
          return next();
     }
     bcrypt.genSalt(10, function(err,salt) {
          if(err) {
               return next(err);
          }
          bcrypt.hash(user.Password,salt,function(err,hash) {
               if(err) {
                    return next(err);
               }
               user.Password = hash;
               next();
          });
     });
});

/*userinfoSchema.methods.isValidPassword = async function(Password) {
     const user = this;
     const compare = await bcrypt.compare(Password,user.Password);
     return compare;
}*/

userinfoSchema.methods.comparePassword = function(pw, cb) {
     bcrypt.compare(pw, this.Password, function(err, isMatch) {
          if(err) {
               return cb(err);
          }
          cb(null, isMatch);
     });
}

module.exports = mongoose.model('UserInfo',userinfoSchema);