require("dotenv").config()
const express = require("express")
const sequelize = require("./db")
const Anime = require("./models/anime")
const Characters = require("./models/characters")
const Comments = require("./models/comments")
const List = require("./models/list")
const Rating = require("./models/rating")
const User = require("./models/user")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const fileUploader = require("express-fileupload")
const router = require("./routes/index")
const errorHandler = require("./middleware/ErrorHandlingMiddleware")
const path = require("path")

const PORT = process.env.PORT || 7000

const app = express()
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_API,
}));
app.use(express.json())
app.use(fileUploader({}))
app.use(express.static(path.resolve(__dirname, "static")))
app.use("/api", router)

// Closing
app.use(errorHandler)


const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server was started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()