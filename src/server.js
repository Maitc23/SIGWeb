let express = require ('express');
let path = require ('path');
let exsession = require('express-session');
let morgan = require ('morgan');
let flash = require('connect-flash');
let passport = require('passport');
var coparser = require('cookie-parser');
let app = express();


//Settings 
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'ejs'); 

//Middlewares 
app.use(morgan('dev'));
app.use(coparser());
app.use(express.json());
app.use(exsession
    ({
    secret: 'plastico',
    resave: false,
    saveUnitialazed: false,
    cookie:{ secure: false }
    }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
//Static Files
app.use(express.static("public"), express.static(path.join(__dirname,"public")));

//Rutas del programa 
app.use('/', require('./app/routes'));

//Servidor
app.listen(app.get('port'), function(){
    console.log('server on port', app.get('port'));
})