const express = require('express');
const bcrypt = require('bcrypt')
const { User, Post } = require('../models');
const { isLoggendIn, isNotLoggendIn } = require('./middlewares')
const passport = require('passport');

const router = express.Router();

router.post('/signup', isNotLoggendIn, async (req, res, next) => {
  try {
    const exUser = await User.findOne({
      where: {
        email: req.body.email
      }
    });

    if (exUser) {
      return res.status(403).send('이미 사용중인 이메일 입니다.')
    }

    const hashedPassword = await bcrypt.hash(req.body.pw, 12)

    await User.create({
      email: req.body.email,
      nickName: req.body.nickName,
      pw: hashedPassword,
    });
    res.status(201).send('ok');
  }
  catch {
    console.error(error);
    next(error); // status 500
  }
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (error, user, info) => {
    if (error) {
      console.error(error);
      return next(error);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      };
      const fullUserWuthoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: {
          exclude: ['pw']
        },
        include: [{
          model: Post,
        }, {
          model: User,
          as: 'Followings',
        }, {
          model: User,
          as: 'Followers',
        }]
      })
      return res.status(200).json(fullUserWuthoutPassword);
    })
  })(req, res, next);
});

router.post('/logout', isLoggendIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.send('ok')
})

module.exports = router;