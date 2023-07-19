const bcrypt = require('bcrypt');
const Model = require('../models/usersModel');
const redis = require('redis');
const redisPort = 6379;

// it is use the create or add a new user in the Databse
module.exports.create = async function (req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  const data = new Model({
    name: req.body.name,
    email: req.body.email,
    password: await bcrypt.hash(password, 10),
  });
  try {
    let user = await Model.findOne({ email: req.body.email });
    
    if (user) return res.status(400).json('User already registered.');
    const dataToSave = await data.save();
    // sending Email
    if (dataToSave) {
      await sendEmail({
        email,
        subject: 'registered',
        message: 'Congratulations you are Registered',
      });
    }

    res.status(201).json(dataToSave);
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// get th single user data with the help of id
module.exports.getOne = async function (req, res, next) {
  try {
    const data = await Model.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get All the data of user with the help of id
module.exports.getAll = async function (req, res, next) {
  const limitValue = req.query.limit || 2;
  let skipValue = req.query.skip || 0;
  const key = 'getAll' + skipValue.toString() + limitValue.toString();
  try {
    const client = redis.createClient(redisPort);
    client.connect();
    // const data = await Model.find();
    // use redis for caching
    client.expire(key, 10);
    const data = await client.get(key);
    if (data) {
      res.json(JSON.parse(data));
    } else {
      Model.paginate({}, { page: req.query.skip, limit: req.query.limit });

      {
        skipValue = skipValue * limitValue;
        const data = await Model.find().limit(limitValue).skip(skipValue);
        //console.log(client);
        await client.set(key, JSON.stringify(data));
        return res.json(data);
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// updated the data of sigle user

module.exports.edit = async function (req, res, next) {
  try {
    if (!req.body) {
      return res.status(400).send({
        message: 'Data to update can not be empty!',
      });
    }
    const id = req.params.id;
    const data = await Model.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false,
    });
    if (!data) {
      res.status(404).send({
        message: `Cannot update model with id=${id}. Maybe model was not found!`,
      });
    } else res.send({ message: 'DATA was updated successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Deleted the data help of id
module.exports.delete = async function (req, res, next) {
  try {
    const id = req.params.id;
    const data = await Model.findByIdAndDelete(id);
    res.send(`Document with ${data.name} has been deleted..`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
