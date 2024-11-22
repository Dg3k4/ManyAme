const Router = require("express")
const router = new Router()
const charactersController = require("../controllers/charactersController")

router.post("/:animeId", charactersController.addCharacterToAnime)
router.post("/:characterId", charactersController.addActorToCharacter)
router.get("/:characterId", charactersController.giveCharacterJoints)
router.get("/actor/:actorId", charactersController.giveActorJoints)
router.get("/", charactersController.getAllCharacterAndActorInfo)

module.exports = router