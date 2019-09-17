let express = require ('express');
let path = require ('path');
let morgan = require ('morgan');

let app = express();

//Settings 
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'ejs'); 

//Middlewares 
app.use(morgan('dev'));
app.use(express.json());

//Static Files
app.use(express.static("public"), express.static(path.join(__dirname,"public")));

//Rutas del programa 
app.use('/', require('./app/routes'));

//Servidor
app.listen(app.get('port'), function(){
    console.log('server on port', app.get('port'));
})