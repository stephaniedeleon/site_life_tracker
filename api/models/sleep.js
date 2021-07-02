const db = require("../db");
const { BadRequestError } = require("../utils/errors");

class Sleep {
    
    /** Fetch all sleep hours */
    static async listSleepForUser(user) {
        //return all sleep logs that the authenticated user has created
        const query = `
            SELECT * FROM sleeps
            WHERE sleeps.user_id = (SELECT id FROM users WHERE email=$1)
        `

        const result = await db.query(query, [user.email]);

        //return sleep logs
        return result.rows;
    }

    /** Logging a sleep */
    static async logSleep({ user, sleep }) {

        const requiredFields = ["startTime", "endTime"];
        requiredFields.forEach((field) => {
            if (!sleep.hasOwnProperty(field) || !sleep[field]) {
                throw new BadRequestError(`Required field - ${field} - missing from request body.`)
            }
        });

        if (sleep.start_time <= sleep.end_time) {
            throw new BadRequestError(`End time must be after the start time.`);
        }

        //create a new sleep - store in database
        const result = await db.query(`
            INSERT INTO sleeps (user_id, start_time, end_time, hours)
            VALUES ((SELECT id FROM users WHERE email=$1), $2, $3, $4) 
            RETURNING user_id, start_time, end_time, hours;
        `, [user.email, sleep.startTime, sleep.endTime, sleep.hours] 
        )

        //return sleep
        return result.rows[0];
    }


    /** Fetch average sleep hours */
    static async getAvgSleepHours(user) {

        const query = `
            SELECT AVG(hours) as "avgSleepHours" 
            FROM sleeps
            WHERE sleeps.user_id = (SELECT id FROM users WHERE email=$1)
        `
        const result = await db.query(query, [user.email]);

        return result.rows[0];
    }  


    /** Fetch total sleep hours */
    static async getTotalSleepHours(user) {

        const query = `
            SELECT SUM(hours) as "totalSleepHours" 
            FROM sleeps
            WHERE sleeps.user_id = (SELECT id FROM users WHERE email=$1)
        `
        const result = await db.query(query, [user.email]);

        return result.rows[0];
    } 
}

module.exports = Sleep;