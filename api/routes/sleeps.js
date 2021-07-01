const express = require("express");
const router = express.Router();
const Sleep = require("../models/sleep");
const { requireAuthenticatedUser } = require("../middleware/security.js");

// requireAuthenticatedUser is added to the chain of middleware that happens 
//      before our route handler is called. (you can do this for any function)
// requireAuthenticatedUser - if user does not exist, it will throw an error

//List sleep logs...
router.get("/", requireAuthenticatedUser, async (req, res, next) => {

    try {
        const user = res.locals.user;
        const sleeps = await Sleep.listSleepForUser(user);
        res.status(200).json({ sleeps });

    } catch(err) {
        next(err);
    }
});


//Record a new sleep log
router.post("/record", requireAuthenticatedUser, async (req, res, next) => {

    try {
        const user = res.locals.user;
        const sleep = await Sleep.logSleep({ user, sleep: req.body });
        res.status(201).json({ sleep });

    } catch(err) {
        next(err);
    }
});


module.exports = router;