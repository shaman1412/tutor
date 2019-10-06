const mongoose = require('mongoose');

const userModel = mongoose.Schema({
  name: { type: String },
  username: {
    type: String,
    index: {
      unique: true
    }
  },
  password: String,
  role: String,
  lesson: [
    {
      name: String,
      invisible: { type: Boolean, default: false },
      subject: [
        {
          name: String,
          topic: [
            {
              name: String,
              link: String
            }
          ]
        }
      ]
    }
  ],
  updateDate: { type: Date, default: Date },
  status: { type: Boolean, default: true }
});

// userModel.pre('save', function(next){
//      let user = this;
//      if(!user.isModified('password')){
//           return next();
//      }
//      user.password = bcrpt.hashSync(user.password, 10);
//      next();
// }, function(err){
//      next(err);
// })

module.exports = mongoose.model('user', userModel);
