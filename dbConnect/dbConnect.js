const mongoose = require('mongoose');

mongoose.connect(mongoString,{useNewUrlParser: true})
.then((res)=> console.log(">>>>>DB connected"))
.catch((err)=> console.error("Connect fail"));

