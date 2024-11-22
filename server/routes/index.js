const Router = require("express")
const router = new Router()
const userRouter = require("./userRouter")
const animeRouter = require("./animeRouter")
const charactersRouter = require("./charactersRouter")
const commentsRouter = require("./commentsRouter")

router.use("/user", userRouter)
router.use("/anime", animeRouter)
router.use("/characters", charactersRouter)
router.use("/comments", commentsRouter)


module.exports = router