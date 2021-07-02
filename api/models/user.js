const bcrypt = require("bcrypt")
const { BCRYPT_WORK_FACTOR } = require("../config")
const db = require("../db")
const { BadRequestError, UnauthorizedError } = require("../utils/errors")

class User {

    // protects the user's password by not returning it
    static makePublicUser(user) {
        return {
          id: user.id,
          firstName: user.first_name,
          lastName: user.last_name,
          email: user.email,
          username: user.username,
          isAdmin: user.is_admin,
          createdAt: user.created_at
        }
    }

    
    //login
    static async login(credentials) {

        //checks if all required fields are present
        const requiredFields = ["email", "password"];
        requiredFields.forEach((property) => {
            if (!credentials.hasOwnProperty(property)) {
                throw new BadRequestError(`Missing ${property} in request body.`)
            }
        });

        //fetches the user with email
        const user = await User.fetchUserByEmail(credentials.email)
        //if user exists, comapares the user's hashed pw with given pw using bcrypt
        if (user) {
            const isValid = await bcrypt.compare(credentials.password, user.password)
            if (isValid) {
                return User.makePublicUser(user)
            } else {
                throw new UnauthorizedError("Email/password do not match.")
            }
        }

        throw new UnauthorizedError("This user does not exist.")
    }


    //register
    static async register(credentials) {

        //checks if all required fields are present
        const requiredFields = ["email", "username", "password", "firstName", "lastName", "isAdmin"];
        requiredFields.forEach((property) => {
            if (!credentials.hasOwnProperty(property)) {
                throw new BadRequestError(`Missing ${property} in request body.`)
            }
        });

        //checks if email has @ and properly placed
        if (credentials.email.indexOf("@") <= 0) {
            throw new BadRequestError("Invalid email.")
        }

        //checks if the given email already exists
        const existingUser = await User.fetchUserByEmail(credentials.email)
        if (existingUser) {
            throw new BadRequestError(`A user already exists with email: ${credentials.email}`)
        }

        //checks if the given username already exists
        const existingUserWithUsername = await User.fetchUserByUsername(credentials.username)
        if (existingUserWithUsername) {
          throw new BadRequestError(`A user already exists with username: ${credentials.username}`)
        } 

        //hashes the password and makes the email all lowercase
        const hashedPassword = await bcrypt.hash(credentials.password, BCRYPT_WORK_FACTOR)
        const normalizedEmail = credentials.email.toLowerCase()

        //inserts the new user into the user database table
        const userResult = await db.query(`
            INSERT INTO users (email, username, password, first_name, last_name, is_admin)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id, email, first_name, is_admin, created_at;
        `,
            [normalizedEmail, credentials.username, hashedPassword, credentials.firstName, credentials.lastName, credentials.isAdmin]
        )

        //extracts the new user and returns it
        const user = userResult.rows[0];

        return User.makePublicUser(user);
    }


    //gets user with their email
    static async fetchUserByEmail(email) {
        if (!email) {
          throw new BadRequestError("No email provided");
        }
    
        const result = await db.query(`
            SELECT * FROM users WHERE email = $1
        `, [email.toLowerCase()]);
        
        const user = result.rows[0];
    
        return user;
    }


    //gets user with their username
    static async fetchUserByUsername(username) {
        if (!username) {
          throw new BadRequestError("No username provided");
        }
    
        const result = await db.query(`
            SELECT * FROM users WHERE username = $1
        `, [username]);
        
        const user = result.rows[0];
    
        return user;
    }
}

module.exports = User

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