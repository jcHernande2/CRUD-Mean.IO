const cors=require('cors');
const express=require("express");
const path=require('path');
const app=express();

//const IndexRoute=require('.//index');
//const TaskRoute=require('./routes/task');
//setting
//app.set('views',path.join(__dirname,'views'));
app.set('port',process.env.PORT || 3000);
app.engine('html',require('ejs').renderFile);
app.set('view engine','ejs');
//midelwares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
//routes
//app.use(IndexRoute);
//app.use('/api',TaskRoute);

//static file
app.use(express.static(path.join(__dirname,'dist')));

//start server
app.listen(app.get('port'),()=>{
    console.log("server op port ",app.get('port'));
});