const path = require('path');
const Controller = require('./controllers');
const express = require('express');
const sequelize = require('./config/connection');
const helpers = require('./config/connection');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({helpers});
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    secret: 'keyboard cat',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

const app = express();
const PORT = process.env.PORT || 3001;

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");


app.use(session(sess));
app.use(express.static((path.join(__dirname, "public"))));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(Controller);

sequelize.sync({ force: false }).then(function() {
    app.listen(PORT, function() {
        console.log(`Now listening on port ${PORT}`);
    });
});

module.exports = app;