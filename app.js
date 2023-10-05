const express = require('express');
const app = express();
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
//connect to mongo db
const dbURI = 'mongodb+srv://sandra:test1234@cluster0.zqknk25.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbURI,{useNewUrlParser:true,useUnifiedTopology:true})
.then((result)=>app.listen(3000))
.catch((err)=>console.log(err));
const morgan = require('morgan');
//register view engine
app.set('view engine','ejs');

//blog.roues
app.use('/blogs',blogRoutes)
//listem for request

//middlewear and static files
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));

app.use((req,res,next)=>{
    console.log('new request made:');
    console.log('host: ',req.hostname);
    console.log('path: ',req.path);
    console.log('method: ',req.method);
    next();
});


app.get('/',(req,res)=>{
    res.redirect('/blogs');
});

app.get('/about',(req,res)=>{
    res.render('about',{title: 'About'});
});
//blog routes

//404 page

app.use((req,res)=>{
    res.status(404).render('404',{title: 'Error'})
})
