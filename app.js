//dependencies//
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

//routes conection//
const authRoutes = require('./Routes/authroutes');
const dashboardRoutes = require('./Routes/dashboardroutes');

//models//
const Users = require('./Models/users');

// express app//
const app = express();

//mongodb connection//
const dbURI = 'mongodb+srv://coderajustine30:july302002jj@pd-ease.k76jchy.mongodb.net/PD-EASE?retryWrites=true&w=majority';
mongoose.connect(dbURI)
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));
    
// register view engine//
app.set('view engine', 'ejs');
app.set('views', 'Views');

//middleware//
app.use(express.static('Public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());


//routes//

app.get('*', checkUser);

//loginroutes
app.use(authRoutes);

//dashboard
app.use(dashboardRoutes);




//404//
app.use((req, res) =>{  res.status(404).render('404.ejs');  });

