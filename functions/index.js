const functions = require('firebase-functions')
const spawn = require('child-process-promise').spawn
const path = require('path')
const os = require('os')
const fs = require('fs')
const cors = require('cors')({ origin: true })
const Busboy = require('busboy')

const gcconfig = {
  projectId: 'material-ui-mobx-starter',
  keyFilename: 'private-key.json'
}

const gcs = require('@google-cloud/storage')(gcconfig)

exports.onImageUpload = functions.storage.object().onFinalize(object => {
  console.log(object)

  const fileBucket = object.bucket
  const filePath = object.name
  const contentType = object.contentType
  const metageneration = object.metageneration
  console.log('File upload detected. Function started.')

  if (!contentType.startsWith('image/')) {
    console.log('This is not an image.')
    return null
  }

  // Get the file name.
  const fileName = path.basename(filePath)
  // Exit if the image is already a thumbnail.
  if (fileName.startsWith('thumb_')) {
    console.log('Already a Thumbnail.')
    return null
  }

  // Download file from bucket.
  const bucket = gcs.bucket(fileBucket)
  const tempFilePath = path.join(os.tmpdir(), fileName)
  const metadata = {
    contentType: contentType
  }
  return bucket
    .file(filePath)
    .download({
      destination: tempFilePath
    })
    .then(() => {
      console.log('Image downloaded locally to', tempFilePath)
      // Generate a thumbnail using ImageMagick.
      return spawn('convert', [
        tempFilePath,
        '-thumbnail',
        '150x150>',
        tempFilePath
      ])
    })
    .then(() => {
      console.log('Thumbnail created at', tempFilePath)
      // We add a 'thumb_' prefix to thumbnails file name. That's where we'll upload the thumbnail.
      const thumbFileName = `thumb_${fileName}`
      const thumbFilePath = path.join(path.dirname(filePath), thumbFileName)
      // Uploading the thumbnail.
      return bucket.upload(tempFilePath, {
        destination: thumbFilePath,
        metadata: metadata
      })
      // Once the thumbnail has been uploaded delete the local file to free up disk space.
    })
    .then(() => fs.unlinkSync(tempFilePath))
})

exports.uploadFile = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    if (req.method !== 'POST') {
      return res.status(500).json({
        message: 'Not allowed'
      })
    }
    const busboy = new Busboy({ headers: req.headers })
    let uploadData = null

    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
      const filepath = path.join(os.tmpdir(), filename)
      uploadData = { file: filepath, type: mimetype }
      file.pipe(fs.createWriteStream(filepath))
    })

    busboy.on('finish', () => {
      const bucket = gcs.bucket('material-ui-mobx-starter.appspot.com')
      bucket
        .upload(uploadData.file, {
          uploadType: 'media',
          metadata: {
            metadata: {
              contentType: uploadData.type
            }
          }
        })
        .then(() => {
          res.status(200).json({
            message: 'It worked!'
          })
        })
        .catch(err => {
          res.status(500).json({
            error: err
          })
        })
    })
    busboy.end(req.rawBody)
  })
})
