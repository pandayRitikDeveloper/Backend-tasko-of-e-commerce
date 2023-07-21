const Model = require('../models/product');
const tokenModel = require('../models/tokenModel');
const expense = require('../models/product');

//add Functionality
module.exports.create = async function (req, res, next) {
      try {
        let user = await Model.findOne({ email: req.body.email });
        // console.log(user)
        if(user){
          let data = new Model({
            productName: req.body.productName,
            productPrice: req.body.productPrice,
            descountAmount: req.body.descountAmount,
            descountPercentage: req.body.descountPercentage,
            productImage: req.body.productImage,
            quantity: req.body.quantity,
        
              });
          const dataToSave = data.save();
          dataToSave.then(function (result) {
            return res.json(result); 
          });
        }
        res.status(401).json({ message: "User not present in data base" }); 
        
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
};
// get th single user data with the help of id
module.exports.getAll = async function (req, res, next) {
  try {
    // console.log(req.user. _id)
    let user = await Model.findOne({ email: req.body.email });
    // console.log(user)
    if(user){
      const data = await expense.find();
      res.json(data);
    }else
    res.status(401).json({ message: "User not present in data base" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//it is use the delete data in the Databse
module.exports.productDelete = async function (req, res, next) {
  try {
    let user = await Model.findOne({ email: req.body.email });
    // console.log(user)
    if(user){
      const data = await expense.findByIdAndDelete(req.params.id);
      res.json(data);
    }else
    res.status(401).json({ message: "User not present in data base" });          
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
//update usaer Functionality
module.exports.productUpdate = async function (req, res, next) {
try{
    const id = req.params.id;
    let user = await Model.findOne({ email: req.body.email });
    // console.log(user)
    if(user){
      const result = await expense.findByIdAndUpdate(
        id,
        updatedData,
        options
      );

      res.send(result);
   
    }else
    res.status(401).json({ message: "User not present in data base" });
             
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
