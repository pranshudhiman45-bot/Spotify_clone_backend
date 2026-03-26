const musicModel = require('../model/music.model')
const jwt = require('jsonwebtoken')
const { uploadFile } = require('../services/storage.service')
const albumModel = require('../model/album.model')
async function createMusic (req, res) {
  const { title } = req.body
  const file = req.file
  const result = await uploadFile(file.buffer)
  const music = await musicModel.create({
    uri: result.url,
    title,
    artist: req.user.id
  })
  res.status(201).json({
    music: {
      id: music._id,
      uri: music.uri,
      title: music.title,
      artist: music.artist
    }
  })
}
async function createAlbum (req, res) {
  const { title, music } = req.body
  const album = await albumModel.create({
    title: title,
    artist: req.user.id,
    music: music
  })

  res.status(201).json({
    message: 'Album is created sucessfully',
    id: album._id,
    title: album.title,
    artist: album.artist,
    music: album.music
  })
}
async function getAllMusic(req, res) {
  const music =await musicModel.find().limit(2).populate('artist')
  res.status(200).json({
    message:"Musics fetch sucessfully",
    music:music
  })
}
async function getAllAlbum(req,res){
  const albums = await albumModel.find().select("title artist").populate("artist", "username")
  res.status(200).json({
    message:"Album fetch sucessfully",
    albums:albums 
  })
}
async function getAlbumById(req, res){
  const albumId = req.params.albumId
const album = await albumModel.findById(albumId).populate("artist", "username email").populate("music")
res.status(200).json({
  message:"Album fetch sucessfully",
  album:album
})
}
module.exports = { createMusic, createAlbum , getAllMusic, getAllAlbum, getAlbumById }
