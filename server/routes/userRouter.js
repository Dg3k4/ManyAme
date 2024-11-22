const Router = require("express")
const router = new Router()
const userController = require("../controllers/userController")
const ratingController = require("../controllers/ratingController")
const commentsController = require("../controllers/commentsController")
const listController = require("../controllers/listController")
const {body} = require("express-validator")
const authMiddleware = require("../middleware/AuthMiddleware")
const checkRoleMiddleware = require("../middleware/CheckRoleMiddleware")

router.post("/registration",
    body("email").isEmail(),
    body("password").isLength({min: 5, max: 25}),
    userController.registration);
router.post("/login", userController.login);
router.post("/logout", userController.logout);

router.post("/rating", authMiddleware, ratingController.setRating)
router.post("/comments/:animeId", authMiddleware, commentsController.addComment)

router.post("/list", authMiddleware, listController.createList)
router.post("/type-list", authMiddleware, userController.addAnimeToTypeList)
router.delete("/type-list", authMiddleware, userController.deleteAnimeFromTypeList)

router.post("/roles", userController.initRoles)
router.post("/role", authMiddleware, checkRoleMiddleware(1), userController.addNewRole)

router.get("/activate/:activationLink", userController.activate);
router.get("/refresh", userController.refresh);
router.get("/users", authMiddleware, userController.getUsers);

module.exports = router