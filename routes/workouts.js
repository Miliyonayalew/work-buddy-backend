const express = require('express')
const router = express.Router()


const { 
  getWorkouts,
  getWorkout,
  createWorkout,
  updateWorkout,
  deleteWorkout 
} = require('../controllers/workoutController')

const requireAuth = require('../middleware/requireAuth')

router.use(requireAuth)

//Get all workouts
router.get('/', getWorkouts)

//Get a single workout
router.get('/:id', getWorkout)

//Create a workout
router.post('/', createWorkout)

//Update a workout
router.patch('/:id', updateWorkout)

//Delete a workout
router.delete('/:id', deleteWorkout)
module.exports = router;