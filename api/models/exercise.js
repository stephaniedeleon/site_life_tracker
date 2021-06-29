const db = require("../db");
const { BadRequestError } = require("../utils/errors");

class Exercise {
    
    static async listExerciseForUser(user) {
        //return all orders that the authenticated user has created
        const query = `
            SELECT * FROM exercises
            WHERE exercises.user_id = (SELECT id FROM users WHERE email=$1)
        `

        const result = await db.query(query, [user.email]);

        return result.rows;
    }


    static async createExercise({ user, exercise }) {

        if (!exercise || !Object.keys(exercise).length) {
            throw new BadRequestError("No exercise info provided")
        }

        //create a new exercise - store in database
        const result = await db.query(`
            INSERT INTO exercises (user_id, name, category, duration, intensity)
            VALUES ((SELECT id FROM users WHERE email=$1), $2, $3, $4, $5) 
            RETURNING user_id, name, category, duration, intensity;
        `, [user.email, exercise.name, exercise.category, exercise.duration, exercise.intensity] 
        )

        //return exercise
        return result.rows[0];
    }

}

module.exports = Exercise;