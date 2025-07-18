const express = require('express');
const router = require('./src/routes/api');
const app = new express();

const rateLimit = require("express-rate-limit");
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const path = require('path');



// MongoDB connection
let url="mongodb+srv://NOMAN:111820010@logitech0.taiw7.mongodb.net/MERN-ECOM";

mongoose.connect(url,{autoIndex:true}).then(()=>{
    console.log('MongoDB Connected');
}).catch(err=>{
    console.log("err connecting to MongoDB");
})


app.use(cookieParser());
app.use(cors({
    origin: "https://d-md-noman-e-commerce.vercel.app", // ✅ Frontend domain
    credentials: true
}));
app.use(
    helmet.contentSecurityPolicy({
        useDefaults: true,
        directives: {
            "img-src": ["'self'", "https:", "data:"]
        },
    })
);
app.use(mongoSanitize());
app.use(xss());
app.use(hpp())



app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));




const limiter= rateLimit({windowMs:15*60*1000,max:3000})
app.use(limiter)

app.set('etag', false);
app.use("/api/v1",router)

// app.use(express.static("client/dist"));
//
//
// // Add React Front End Routing
// app.get('*',function (req,res) {
//     res.sendFile(path.resolve(__dirname,'client','dist','index.html'))
// })

module.exports=app;




