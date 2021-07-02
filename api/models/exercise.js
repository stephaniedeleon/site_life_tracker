const db = require("../db");
const { BadRequestError } = require("../utils/errors");

class Exercise {
    
    /** Fetch all exercises */
    static async listExerciseForUser(user) {
        //return all orders that the authenticated user has created
        const query = `
            SELECT * FROM exercises
            WHERE exercises.user_id = (SELECT id FROM users WHERE email=$1)
            ORDER BY created_at DESC
        `
        const result = await db.query(query, [user.email]);

        //return exercises
        return result.rows;
    }


    /** Creating a new exercise */
    static async createExercise({ user, exercise }) {

        const requiredFields = ["name", "category", "duration", "intensity"];
        requiredFields.forEach((field) => {
        if (!exercise.hasOwnProperty(field) || !exercise[field]) {
            throw new BadRequestError(`Required field - ${field} - missing from request body.`)
        }
        });

        if (exercise.duration < 1) {
            throw new BadRequestError(`Duration must be more than 1 minute.`);
        } else if (exercise.intensity < 1 || exercise.intensity > 10) {
            throw new BadRequestError(`Intensity must be between 1 and 10.`);
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


    /** Fetch total exercise time */
    static async getTotalExerciseTime(user) {

        const query = `
            SELECT SUM(duration) as "totalTime" 
            FROM exercises
            WHERE exercises.user_id = (SELECT id FROM users WHERE email=$1)
        `
        const result = await db.query(query, [user.email]);

        return result.rows[0];
    }

    /** Fetch avg exercise intensity */
    static async getAvgIntensity(user) {

        const query = `
            SELECT AVG(intensity) as "avgIntensity" 
            FROM exercises
            WHERE exercises.user_id = (SELECT id FROM users WHERE email=$1)
        `
        const result = await db.query(query, [user.email]);

        return result.rows[0];
    }

}

module.exports = Exercise;