const express = require("express");
const router = express.Router();
const Exercise = require("../models/exercise");
const { requireAuthenticatedUser } = require("../middleware/security.js");

// requireAuthenticatedUser is added to the chain of middleware that happens 
//      before our route handler is called. (you can do this for any function)
// requireAuthenticatedUser - if user does not exist, it will throw an error

//List exercises...
router.get("/", requireAuthenticatedUser, async (req, res, next) => {

    try {
        const user = res.locals.user;
        const exercises = await Exercise.listExerciseForUser(user);
        res.status(200).json({ exercises });

    } catch(err) {
        next(err);
    }
});


//Creating a new exercise
router.post("/create", requireAuthenticatedUser, async (req, res, next) => {

    try {
        const user = res.locals.user;
        const exercise = await Exercise.createExercise( { user, exercise: req.body.exercise });
        res.status(201).json({ exercise });

    } catch(err) {
        next(err);
    }
});


module.exports = router;