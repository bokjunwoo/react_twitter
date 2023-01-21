const express = require('express');
const cors = require('cors')
const db = require('./models');

const app = express();

app.use(cors({
  origin: '*'
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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