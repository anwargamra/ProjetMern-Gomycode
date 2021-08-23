const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
const Conversation= require('./routes/Conversation');
const Message= require('./routes/Message');

require('dotenv').config({path: './config/.env'});

const dbConnect=require("./config/db")
dbConnect()

const {checkUser, requireAuth} = require('./middleware/auth.middleware');
const cors = require('cors');

const app = express();
//
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  'allowedHeaders': ['sessionId', 'Content-Type'],
  'exposedHeaders': ['sessionId'],
  'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
  'preflightContinue': false /*pass the header*/
}
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

//jwt 
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id)
});

 //routes
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/Conversation', Conversation);
app.use('/api/Message', Message);


app.listen(5000, () => {
  console.log(`Listening on port ${5000}`);
})