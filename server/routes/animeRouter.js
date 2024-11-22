const Router = require("express")
const router = new Router()
const animeController = require("../controllers/animeController")
const infoController = require("../controllers/infoController")
const commentsController = require("../controllers/commentsController")
const checkRoleMiddleware = require("../middleware/CheckRoleMiddleware")

router.post("/", checkRoleMiddleware(2), animeController.createAnime)
router.post("/voiceover/:animeId", checkRoleMiddleware(2), animeController.addAnimeVoiceover)
router.post('/link/:animeId', checkRoleMiddleware(2), animeController.addLinkAnimeTo)
// router.post("/genre/:animeId", animeController.addGenreToAnime)

router.get('/genre', infoController.giveGenres)  // <-- этот маршрут теперь идет раньше
router.get('/status', infoController.giveStatuses)
router.get('/', animeController.giveAll)

router.get('/:animeId', animeController.giveOne)  // <-- этот маршрут теперь идет ниже
router.get('/:animeId/trailer', animeController.giveAnimeTrailers)

router.get('/comments/:animeId', commentsController.takeAnimeComments)

router.post('/status', checkRoleMiddleware(2), infoController.createStatus)
router.post('/release', checkRoleMiddleware(2), infoController.createRelease)
router.post('/type', checkRoleMiddleware(2), infoController.createType)
router.post('/mpaa', checkRoleMiddleware(2), infoController.createMPAA)
router.post('/genre', checkRoleMiddleware(2), infoController.createGenre)
router.post('/studio', checkRoleMiddleware(2), infoController.createStudio)

module.exports = router
