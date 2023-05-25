require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')


// create the app
const app = express();

//cors
app.use(cors());

// middleware
app.use(express.json())
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/workouts', workoutRoutes )
app.use('/api/user', userRoutes )

// connect to database
mongoose.connect(process.env.MONGO_URI)
  .then(() => {    
      // listening for request
      app.listen(process.env.PORT, () => {
        console.log("Connected to DB & Server running on port", process.env.PORT)
      })
  })
  .catch((error)=>{
    console.log(error)
  })

