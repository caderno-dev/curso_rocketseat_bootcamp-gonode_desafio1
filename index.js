const express = require('express')
const nunjucks = require('nunjucks')

const app = express()

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

app.use(express.urlencoded({ extended: false }))
app.set('view engine', 'njk')

app.get('/', (req, res) => {
  return res.render('index')
})

app.post('/check', (req, res) => {
  console.log(req.body)
  var age = req.body.age
  if (age >= 18) {
    return res.redirect(`/major?age=${age}`)
  } else {
    return res.redirect(`/minor?age=${age}`)
  }
})

const checkAgeQuery = (req, res, next) => {
  if (!req.query.age) {
    return res.redirect('/')
  }

  return next()
}

app.get('/major', checkAgeQuery, (req, res) => {
  return res.render('resultado', {
    msg: `Você é  maior de idade e possui ${req.query.age} anos.`
  })
})

app.get('/minor', checkAgeQuery, (req, res) => {
  return res.render('resultado', {
    msg: `Você é  menor de idade e possui ${req.query.age} anos.`
  })
})

app.listen(3000)
