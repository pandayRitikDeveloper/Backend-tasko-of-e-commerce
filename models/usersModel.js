const { Schema, mongoose } = require('mongoose');

const mongoosePaginate = require('mongoose-paginate-v2');
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumbe:{
      type:String,
      required:true
    },
    location:{
      type:String,
      required:true
    },
    profilePicture:{
       type:String,
       default:"https://www.opentechinfo.com/wp-content/uploads/2018/08/whatsapp-dp.png",
    },
    userType: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('User', userSchema);
