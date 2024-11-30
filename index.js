const express = require('express')
const exphbs = require('express-handlebars')
const flash = require('express-flash')
const helpers = require('./helpers/handlebars')
const cookieSession = require('cookie-session')

const app = express()

const conn = require('./db/conn')



const Evento = require('./models/Evento')
const User = require('./models/User')
const EventosControllers = require('./controllers/EventosControllers')
const Participacao = require('./models/Participacao')


const eventosRoutes = require('./routes/eventosRoutes')
const authRoutes = require('./routes/authRoutes')


const hbs = exphbs.create({
    helpers: {
        ...helpers,
        temPermissaoBusca: function(userid) {
             // Se for admin, retorna falso (sem permissão)
             if (userid === 'admin') return false;

             // Outros usuários têm permissão
             return !!userid; // Verifica se o userid existe
         
        },
        add: function(value, addition) {
            return value + addition;
        },
        multiply: function(a, b) {
            return a * b;
        },
        divide: function(a, b) {
            return a / b;
        },
        porcentagemOcupacao: function(evento) {
            return (evento.participantesAtuais / evento.participantes) * 100;
        }
    },
    defaultLayout: 'main',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }
});


app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.use(
    express.urlencoded({
        extended:true
    })
)
app.use(express.json())

app.use(
    cookieSession({
        name: 'session',
        keys: ['nosso_secret'],
        maxAge: 360000,
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true
    })
)

app.use(flash())
app.use(express.static('public'))

app.use((req,res,next)=>{
    if(req.session.userid){
        res.locals.session = req.session
    }
    next()
})

app.use((req, res, next) => {
    if (req.session && !req.session.flash) {
        req.session.flash = {};
    }
    req.flash = function(type, message) {
        if (req.session.flash && message) {
            req.session.flash[type] = message;
        }
        return req.session.flash[type];
    };
    next();
});

app.get('/eventos-participando', (req, res) => {
    res.render('eventos-participando', { title: 'Eventos Participando' });
});

app.use('/eventos',eventosRoutes)
app.use('/',authRoutes)
app.get('/',EventosControllers.showEventos)

app.get('/profile', checkAuth, EventosControllers.showProfile);

User.hasMany(Participacao);
Participacao.belongsTo(User);

Evento.hasMany(Participacao);
Participacao.belongsTo(Evento);

function checkAuth(req, res, next) {
    if (!req.session.userid) {
        req.flash('message', 'Por favor, faça login para acessar esta página');
        return res.redirect('/login');
    }
    next();
}

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo deu errado!');
});

conn
    .sync()
    //.sync({force:true})
    .then(() => {
        console.log('Banco de dados sincronizado');
        app.listen(3000);
    })
    .catch((err) => console.log(err));
