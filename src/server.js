const express = require("express")
const cors = require("cors")
const apiRouter = require("./routes/Router")

const app = express()
app.use(cors())

const PORT = 3333

app.use(express.json())
app.use("/", apiRouter)

app.listen(PORT, () => console.log(`Http server is running on port: ${PORT}`))