require("dotenv").config({
    path: ".env"
})
const { Pool } = require("pg")
const pool = new Pool({
    connectionString: process.env.POSTGRES_URL
})

const UserController = {

    home: async (req, res) => {
        return res.send("Hello world")
    },

    getAllUsers: async (req, res) => {
        try {
            const { rows } = await pool.query("SELECT * FROM users")
            return res.status(200).send(rows)
        } catch (error) {
            return res.status(400).send(error)
        }
    },

    createUser: async (req, res) => {
        const { user_name } =  req.body
        let user = ""
        try {
           user = await pool.query("SELECT * FROM users WHERE user_name = ($1)", [user_name])
           if(!user.rows[0]) {
            user = await pool.query("INSERT INTO users(user_name) VALUES ($1) RETURNING *", [user_name])
            return res.status(200).send(user.rows)
           }
           else {
            return res.status(200).send("Já existe um usuário com esse Nome, por favor use outro.")
           }
           
        } catch (error) {
            return res.status(400).send(error)
        }
    }
}

module.exports = UserController