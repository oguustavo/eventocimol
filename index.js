const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const flash = require('express-flash')
const path = require('path')

const app = express()

// Setup do Handlebars
const hbs = exphbs.create({
    partialsDir: ['views/partials']
})

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

// Middleware para arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')))

// Middleware para parsing do body
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Setup da sessão
app.use(session({
    name: 'session',
    secret: process.env.SESSION_SECRET || 'nossa_secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000 // 24 horas
    }
}))

// Flash messages
app.use(flash())

// Middleware para variáveis globais
app.use((req, res, next) => {
    if (req.session.userid) {
        res.locals.session = req.session
    }
    next()
})

// Rotas
const eventosRoutes = require('./routes/eventosRoutes')
const authRoutes = require('./routes/authRoutes')

app.use('/', eventosRoutes)
app.use('/', authRoutes)

// Conexão com o banco
const conn = require('./db/conn')

conn
    .sync()
    .then(() => {
        const port = process.env.PORT || 3000
        app.listen(port, () => {
            console.log(`Servidor rodando na porta ${port}`)
        })
    })
    .catch((err) => console.log(err))
