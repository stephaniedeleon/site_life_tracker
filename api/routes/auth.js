const express = require("express")
const User = require("../models/user")
const router = express.Router()
const { createUserJwt } = require("../utils/tokens"); //used to generate web tokens
const { requireAuthenticatedUser } = require("../middleware/security.js");


router.post("/login", async (req, res, next) => {
    try {
      const user = await User.login(req.body)
      const token = createUserJwt(user);
      return res.status(200).json({ user, token })
  
    } catch (err) {
      next(err)
    }
})
  
  
router.post("/register", async (req, res, next) => {
    try {
      const user = await User.register({ ...req.body, isAdmin: false })
      const token = createUserJwt(user);
      return res.status(201).json({ user, token })
  
    } catch (err) {
      next(err)
    }
})

//to get user, helps persist the user when page is refreshed
router.get("/me", requireAuthenticatedUser, async (req, res, next) => {
  try {
    const { email } = res.locals.user;
    const user = await User.fetchUserByEmail(email);
    const publicUser = User.makePublicUser(user);
    return res.status(200).json({ user: publicUser })

  } catch (err) {
    next(err);
  }
})

module.exports = router;

// CREATE TABLE users (
//     id          SERIAL PRIMARY KEY,
//     email       TEXT NOT NULL UNIQUE CHECK (POSITION('@' IN email) > 1),
//     username    TEXT NOT NULL UNIQUE,
//     password    TEXT NOT NULL,
//     first_name  TEXT NOT NULL,
//     last_name   TEXT NOT NULL,
//     is_admin    BOOLEAN NOT NULL DEFAULT FALSE,
//     created_at  TIMESTAMP NOT NULL DEFAULT NOW()
// );