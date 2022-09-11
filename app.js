const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
//const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    next();
});

app.use('/admin', adminRoutes);
//app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect('mongodb+srv://hjaiejhoussem:20819535h@cluster0.atlc1l6.mongodb.net/shop?retryWrites=true&w=majority')
        .then(result => {
            app.listen(3000);	    
        })
        .catch(err => {
            console.log(err);
        });
