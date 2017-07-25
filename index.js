// external modules----------------------------------
const handlebars = require('handlebars')
const exphbs = require('express-handlebars')
const express = require('express')
const session = require('express-session')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')(session)
const bdypsr = require('body-parser')
// internal modules----------------------------------
const userRoute = require('./routes/userRoute')

// extra stuff----------------------------------
const app = express()

// setup mongoose----------------------------------
mongoose.Promise = global.Promise
app.use(express.static('public'))
mongoose.connect('mongodb://localhost/muzak', {
  useMongoClient: true
}).then(
  function () {
    console.log('...connected to database successfully')
  },
  function (err) {
    console.log(err)
  })

  // setup session----------------------------------
app.use(session({
  store: new MongoStore({
    url: 'mongodb://localhost/muzak'
  }),
  secret: 'foo',
  resave: false,
  saveUinitialized: true
}))

// setup handlebars----------------------------------
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}))
app.set('view engine', 'handlebars')

// set up body parser----------------------------------
// listen to ajax request
app.use(bdypsr.json())
// allows us to read the form
app.use(bdypsr.urlencoded({extended: true}))

// get requests from browser----------------------------------
app.get('/', function (req, res) {
  res.render('user/login')
})

app.use('/user', userRoute)

// connect to port ----------------------------------
const port = 3000
app.listen(port, function () {
  console.log(`...successfully connected to port ${port}`)
})
