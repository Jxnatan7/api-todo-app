require("dotenv").config({
    path: ".env"
})
const { Pool } = require("pg")
const pool = new Pool({
    connectionString: process.env.POSTGRES_URL
})

const TodoController = {

    createTodo: async (req, res) => {
        const { desc, done } = req.body
        const { user_id } = req.params
        try {
            const newTodo = await pool.query("INSERT INTO todos (todo_desc, todo_done, user_id) VALUES ($1, $2, $3) RETURNING *" , [desc, done, user_id])
            return res.status(200).send(newTodo.rows)
        } catch (error) {
            return res.status(400).send(error)
        }
    },
    
    getUserTodo: async (req, res) => {
        const { user_id } = req.params
        try {
            const userTodos = await pool.query("SELECT * FROM todos WHERE user_id = ($1)", [user_id])
            return res.status(200).send(userTodos.rows)
        } catch (error) {
            return res.status(400).send(error)
        }
    },

    updateTodo: async (req, res) => {
        const { todo_id, user_id } = req.params
        const data = req.body
        try {
            const belongsToUser = await pool.query("SELECT * FROM todos WHERE user_id = ($1) AND todo_id = ($2)", [user_id, todo_id])
            if(!belongsToUser.rows[0]) return res.status(400).send("A operação de ATUALIZAR TODO não foi concluida")
            const updatedTodo = await pool.query("UPDATE todos SET todo_desc = ($1), todo_done = ($2) WHERE todo_id = ($3) RETURNING *", [data.desc, data.done, todo_id])
            return res.status(200).send(updatedTodo.rows)
        } catch (error) {
            return res.status(400).send(error)
        }
    },

    deleteTodo: async (req, res) => {
        const { user_id, todo_id } = req.params
        try {
            const belongsToUser = await pool.query("SELECT * FROM todos WHERE user_id = ($1) AND todo_id = ($2)", [user_id, todo_id])
            if(!belongsToUser.rows[0]) return res.status(400).send("A operação de DELETAR TODO não foi concluida")
            const deletedTodo = await pool.query("DELETE FROM todos WHERE todo_id = ($1) RETURNING *", [todo_id])
            return res.status(200).send({
                message: "Todo deletado com sucesso!",
                deletedTodo: deletedTodo.rows
            })
        } catch (error) {
            return res.status(400).send(error)
        }
    }
}

module.exports = TodoController