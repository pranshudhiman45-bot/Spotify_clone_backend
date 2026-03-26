const express = require('express')
const musicController = require('../controllers/music.controller')
const multer = require('multer')
const authController = require('../middlewares/auth.middleware')
const upload = multer({
  storage: multer.memoryStorage()
})
const router = express.Router()
router.post(
'/upload', authController.authArtist, upload.single('music'),musicController.createMusic
)
router.post('/album',authController.authArtist, musicController.createAlbum)
router.get('/',authController.authUser, musicController.getAllMusic )
router.get('/album',authController.authUser, musicController.getAllAlbum )
router.get('/album/:albumId', authController.authUser, musicController.getAlbumById)
module.exports = router
