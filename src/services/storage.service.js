const ImageKit = require('@imagekit/nodejs');

async function uploadFile (file) {
  const imageKitClient = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
  })
  const result = await imageKitClient.files.upload({
      file: file.toString('base64'),
    fileName: 'music' + Date.now(),
    folder: 'backend/music'
  })
  return result
}
module.exports = { uploadFile }
