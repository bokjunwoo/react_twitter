const express = require('express');
const cors = require('cors')
const db = require('./models');
const passportConfig = require('./passport');
const session = require('express-session');
const passport = require('passport')
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

dotenv.config();
passportConfig();

const app = express();

app.use(cors({
  origin: '*'
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  saveUninitialized: false,
  resave: false,
  secret: process.env.COOKIE_SECRET
}));
app.use(passport.initialize());
app.use(passport.session());

db.sequelize.sync()
  .then(() => {
    console.log('DB 연결 성공')
  })
  .catch(console.error);

const userRouter = require('./routers/user')
app.use('/user', userRouter)

app.listen(3333, () => {
  console.log('서버 실행중')
})