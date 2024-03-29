require('dotenv').config();
const express = require('express');
const expressLayout = require('express-ejs-layouts');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const connectDB = require('./server/config/db');
const app = express();
const port = process.env.PORT || 3000;
// Connect to Database  
connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

// // Static Files
app.use(express.static('public'));

// Express Session
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    }
  })
);

// // Flash Messages
app.use(flash({ sessionKeyName: 'flashMessage' }));


app.use('/', require('./server/routes/shop'))
app.use('/productpage', require('./server/routes/productpage'))
app.use('/categorypage', require('./server/routes/categorypage'))

// // Templating Engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

// // Routes

app.use('/admin', require('./server/routes/admin'))
app.use('/admin/customer', require('./server/routes/customer'))
app.use('/admin/slider', require('./server/routes/slider'))
app.use('/admin/category', require('./server/routes/category'))
app.use('/admin/product', require('./server/routes/product'))
app.use('/admin/productslider', require('./server/routes/productslider'))
app.use('/admin/newsletter', require('./server/routes/newsletter'))



// Handle 404


app.get('*', (req, res) => {
  res.status(404).render('404');
});

app.listen(port, ()=> {
  console.log(`App listeing on port ${port}`)
});
