const express = require('express');
const cors = require('cors')
const db = require('./models');
const passportConfig = require('./passport');
const session = require('express-session');
const passport = require('passport')
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path')

dotenv.config();
passportConfig();

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true // 쿠키도 허용
}));

app.use('/', express.static(path.join(__dirname, 'uploads')))
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
app.use(morgan('dev'))

db.sequelize.sync()
  .then(() => {
    console.log('DB 연결 성공')
  })
  .catch(console.error);

const userRouter = require('./routers/user')
app.use('/user', userRouter)

const postRouter = require('./routers/post')
app.use('/post', postRouter)

const postsRouter = require('./routers/posts')
app.use('/posts', postsRouter)

app.listen(3333, () => {
  console.log('서버 실행중')
})