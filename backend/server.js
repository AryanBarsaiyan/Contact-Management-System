const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

const uri = process.env.MONGODB_URI;
mongoose.connect(uri, {useUnifiedTopology: true, useNewUrlParser: true}
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const existingRouter = require('./routes/existing');
const newRouter = require('./routes/new');

app.use('/existing', existingRouter);
app.use('/new', newRouter);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'x-www-form-urlencoded, Origin, X-Requested-With, Content-Type, Accept, Authorization, *');
  if (req.method === 'OPTIONS'){
      res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE, OPTIONS');
      res.setHeader('Access-Control-Allow-Credentials', true);
      return res.status(200).json({});
  }
  next();
});


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
