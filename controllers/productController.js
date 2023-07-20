const Model = require('../models/product');
const tokenModel = require('../models/tokenModel');
const productModel = require('../models/product');

//add Functionality
module.exports.create = async function (req, res, next) {
  let data;
  if (req.headers && req.headers.authorization) {
    const authorization = req.headers.authorization.split(' ')[1];
    tokenModel.findOne({ token: authorization }, function (err, user1) {
      if (err) return handleErr(err);
      data = new Model({
        name: req.body.name,
        amount: req.body.amount,
        description: req.body.description,
        date: req.body.date,
        userID: user1.userID,
        category: req.body.category,
      });
      try {
        const dataToSave = data.save();
        dataToSave.then(function (result) {
          res.status(201).json(result); 
        });
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    });
  }
};
//Search Functionality
module.exports.seachItem = async function (req, res, next) {

  try{
    const amount = req.query.amount;
    const name=req.query.name;
    const description=req.query.description;
    const data = await productModel.find({
      $or: [{ name}, {amount} ,{description}]
    })
  return  res.status(201).json(data);
  
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// it is use the delete data in the Databse
module.exports.productDelete = async function (req, res, next) {
  try {
    let userId;
    const id = req.params.id;
    if (req.headers && req.headers.authorization) {
      const authorization = req.headers.authorization.split(' ')[1];
      tokenModel.findOne({ token: authorization }, function (err, user1) {
        if (err) return handleErr(err);
        userId = user1.userID;

        productModel.findOne({ userID: userId }, function (err, user2) {
          if (err) return handleErr(err);
          userId = user2._id;
          console.log(userId);
          console.log(id);
          if (userId.toString() == id) {
            async function asyncCall() {
              const data = await productModel.findByIdAndDelete(req.params.id);
              res.send(`Document with ${data.name} has been deleted..`);
            }
            asyncCall();
          } else {
            res.send(`param or token invalid..`);
          }
        });
      });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
//update usaer Functionality
module.exports.productUpdate = async function (req, res, next) {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };
    let userId;
    if (req.headers && req.headers.authorization) {
      const authorization = req.headers.authorization.split(' ')[1];
      tokenModel.findOne({ token: authorization }, function (err, user1) {
        if (err) return handleErr(err);
        userId = user1.userID;

        productModel.findOne({ userID: userId }, function (err, user2) {
          if (err) return handleErr(err);
          userId = user2._id;
          if (userId == id) {
            async function asyncCall() {
              const result = await productModel.findByIdAndUpdate(
                id,
                updatedData,
                options
              );

              res.send(result);
            }
            asyncCall();
          }
        });
      });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
