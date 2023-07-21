const { number, string } = require('joi');
const { Schema, mongoose } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const userExpense = new Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    productPrice: {
      type: Number,
      required: true,
    },
    descountAmount: {
      type: Number,
      required: true,
    },
    descountPercentage: {
      type: Number,
      required: true,
    },
    productImage:{
      type:String,
      required:true
    },
    quantity:{
      type:Number,
      required:true
    }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
userExpense.plugin(mongoosePaginate);

module.exports = mongoose.model('Record', userExpense);
