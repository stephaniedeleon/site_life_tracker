const db = require("../db");
const { BadRequestError } = require("../utils/errors");

class Nutrition {
    
    /** Fetch all nutritions */
    static async listNutritionForUser(user) {
        //return all orders that the authenticated user has created
        const query = `
            SELECT * FROM nutritions
            WHERE nutritions.user_id = (SELECT id FROM users WHERE email=$1)
            ORDER BY created_at DESC
        `

        const result = await db.query(query, [user.email]);

        //return nutritions
        return result.rows;
    }


    /** Recording a new nutrition */
    static async createNutrition({ user, nutrition }) {

        const requiredFields = ["name", "category", "quantity", "calories"];
        requiredFields.forEach((field) => {
        if (!nutrition.hasOwnProperty(field) || !nutrition[field]) {
            throw new BadRequestError(`Required field - ${field} - missing from request body.`)
        }
        });

        if (nutrition.quantity < 1) {
            throw new BadRequestError(`Quantity must be more than 1.`);
        } else if (nutrition.calories < 1) {
            throw new BadRequestError(`Calories must be more than 1.`);
        }

        //create a new nutrition - store in database
        const result = await db.query(`
            INSERT INTO nutritions (user_id, name, category, quantity, calories)
            VALUES ((SELECT id FROM users WHERE email=$1), $2, $3, $4, $5) 
            RETURNING user_id, name, category, quantity, calories;
        `, [user.email, nutrition.name, nutrition.category, nutrition.quantity, nutrition.calories] 
        )

        //return nutrition
        return result.rows[0];
    }


    /** Fetch average calories */
    static async getAvgCalories(user) {

        const query = `
            SELECT AVG(calories) as "avgCalories" 
            FROM nutritions
            WHERE nutritions.user_id = (SELECT id FROM users WHERE email=$1)
        `
        const result = await db.query(query, [user.email]);

        return result.rows[0];
    }  
    
    
    /** Fetch max calories */
    static async getMaxCalories(user) {

        const query = `
            SELECT MAX(calories) as "maxCalories" 
            FROM nutritions
            WHERE nutritions.user_id = (SELECT id FROM users WHERE email=$1)
        `
        const result = await db.query(query, [user.email]);

        return result.rows[0];
    }  
}

module.exports = Nutrition;