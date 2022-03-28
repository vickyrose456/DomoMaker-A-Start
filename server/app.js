const path = require('path');
const express = require('express');
const compression = require('compression');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const expressHandlebars = require('express-handlebars');
const helmet = require('helmet');
const session = require('express-session');

const router = require('./router.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

// connect to the DB
const dbURI = process.env.MONGODB_URI || 'mongodb+srv://victoriaolivieri:5wAIPI4lVifWWiLL@cluster1.gica3.mongodb.net/olivieri-domo-maker-a?retryWrites=true&w=majority ';
// 'mongodb://127.0.0.1/DomoMaker';

mongoose.connect(dbURI, (err) => {
  if (err) {
    console.log('Could not connect to database');
    throw err;
  }
});

const app = express();

app.use(helmet());
app.use('/assets', express.static(path.resolve(`${__dirname}/../hosted/`)));
app.use(favicon(`${__dirname}/../hosted/img/favicon.png`));
app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/* key = name of cookie that takes in request
default key = connect.sid, so renamed to sessionid for security
secret = private string used for hashing
resave = tells session to refresh so key is active
saveUn... = option tells module to always make sessions even when not logged in
this auto gen each user session key
*/
app.use(session({
  key: 'sessionid',
  secret: 'Domo Arigato',
  resave: true,
  saveUninitialized: true,
}));

app.engine('handlebars', expressHandlebars.engine({ defaultLayout: '' }));
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/../views`);
app.use(cookieParser());

router(app);

app.listen(port, (err) => {
  if (err) { throw err; }
  console.log(`Listening on port ${port}`);
});
