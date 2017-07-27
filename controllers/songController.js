const Song = require('../models/Song')
const Playlist = require('../models/Playlist')

function create (req, res) {
  Playlist.find().sort('-created_at').exec(function (err, post) {
    if (err) return res.send(err)

    Playlist.findById(post[post.length - 1].id, function (err, playlist) {
      if (err) return res.send(err)
      var newSong = new Song({
        name: req.body.name,
        artist: req.body.artist,
        album: req.body.album
      })
      newSong.save(function (err, newSong) {
        if (err) return res.send(err)
        playlist.songs.push(newSong.id)
        playlist.save()
        res.send({
          status: 'ok',
          message: 'New song successfully added!'
        })
      })
    })
  })
}

module.exports = {
  create
}
