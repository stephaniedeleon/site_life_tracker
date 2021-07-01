const express = require("express");
const router = express.Router();
const Nutrition = require("../models/nutrition");
const { requireAuthenticatedUser } = require("../middleware/security.js");

// requireAuthenticatedUser is added to the chain of middleware that happens 
//      before our route handler is called. (you can do this for any function)
// requireAuthenticatedUser - if user does not exist, it will throw an error

/** Listing nutriton  */
router.get("/", requireAuthenticatedUser, async (req, res, next) => {

    try {
        const user = res.locals.user;
        const nutritions = await Nutrition.listNutritionForUser(user);
        res.status(200).json({ nutritions });

    } catch(err) {
        next(err);
    }
});


/** Recording a new nutrition  */
router.post("/record", requireAuthenticatedUser, async (req, res, next) => {

    try {
        const user = res.locals.user;
        const nutrition = await Nutrition.createNutrition( { user, nutrition: req.body });
        res.status(201).json({ nutrition });

    } catch(err) {
        next(err);
    }
});


/** Average calories  */
router.get("/average", requireAuthenticatedUser, async (req, res, next) => {

    try {
        const user = res.locals.user;
        const avgCalories = await Nutrition.getAvgCalories(user);
        res.status(200).json(avgCalories);

    } catch(err) {
        console.log(err);
        next(err);
    }
});


module.exports = router;