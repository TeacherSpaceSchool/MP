const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const connectDB = require('./models/index');
const app = express();
const indexRouter = require('./routes/index');
const adminRouter = require('./routes/admin');
const usersRouter = require('./routes/users');
const landingRouter = require('./routes/landing');
const integrateRouter = require('./routes/integrate');
const dataRouter = require('./routes/data');
const passportEngine = require('./module/passport');
const cors = require('cors');
const user = require('./module/user');
const formData = require('express-form-data');
const expressAMP = require('express-amp');
const os = require('os');
const compression = require('compression');
const logger1 = require('logger').createLogger('development.log');
const bodyParser = require('body-parser');
require('body-parser-xml-json')(bodyParser);
module.exports.dirname = __dirname;
module.exports.logge1r = logger1;
let oneYear = 365 * 24 * 60 * 60 * 1000;

//run passport
passportEngine.start();
user.createAdmin();

const options = {
    uploadDir: os.tmpdir(),
    autoClean: true
};

//datebase
connectDB.connect()
// view engine setup
app.use(compression());
app.use(expressAMP({
    override: true,
    //staticsPath: path.join(__dirname, 'public')
}));
//app.use(minify());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());
app.use(function(req, res, next){
    if (req.is('text/*')) {
        req.text = '';
        req.setEncoding('utf8');
        req.on('data', function(chunk){ try{req.text += chunk} catch(error) {console.error(error)} });
        req.on('end', function(){ try{req.body = JSON.parse(req.text); next()} catch(error) {console.error(error)} });
    } else {
        next();
    }
});
app.use(bodyParser.json());
app.use(bodyParser.xml());
app.use(express.static(path.join(__dirname, 'aclient')));
app.use(express.static(path.join(__dirname, 'landing')));
app.use(express.static(path.join(__dirname, 'public'), { maxAge: oneYear }));
app.use(express.static(path.join(__dirname, 'admin')));
app.use(cors());
// parse data with connect-multiparty.
app.use(formData.parse(options));
// clear from the request and delete all empty files (size == 0)
app.use(formData.format());
// change file objects to stream.Readable
app.use(formData.stream());
// union body and files
app.use(formData.union());

app.use(new RegExp(/^\/(about|contact|delivery|faq|size|uslovia|kategory?|signin|resetpass|signup|profile|item?|blogs|preorders|preorder?|mypreorders|search|skidki|blog?|favorite|cart|myorders|order?)?/), indexRouter);
app.use('/admin', adminRouter);
app.use('/users', usersRouter);
app.use('/data', dataRouter);
app.use('/landing', landingRouter);
app.use('/integrate', integrateRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    try{
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
    logger1.error(err)
  // render the error page
  res.status(err.status || 500);
  res.render('error');
} catch(error) {console.error(error)}
});

module.exports = app;
