const express = require('express');
const bcrypt = require('bcrypt')
const { User, Post } = require('../models');
const { isLoggendIn, isNotLoggendIn } = require('./middlewares')
const passport = require('passport');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    if(req.user) {
      const fullUserWuthoutPassword = await User.findOne({
        where: { id: req.user.id },
        attributes: {
          exclude: ['pw']
        },
        include: [{
          model: Post,
          attributes: ['id']
        }, {
          model: User,
          as: 'Followings',
          attributes: ['id']
        }, {
          model: User,
          as: 'Followers',
          attributes: ['id']
        }]
      })
      res.status(200).json(fullUserWuthoutPassword)
    } else {
      res.status(200).json(null)
    }
  } catch(error) {
    console.error(error);
    next(error)
  }
})

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
          attributes: ['id']
        }, {
          model: User,
          as: 'Followings',
          attributes: ['id']
        }, {
          model: User,
          as: 'Followers',
          attributes: ['id']
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

router.patch('/nickname', isLoggendIn, async (req, res, next) => {
  try {
    await User.update({
      nickName: req.body.nickName
    }, {
      where: { id: req.user.id }
    })
    res.status(200).json({ nickName: req.body.nickName });
  } catch(error) {
    console.error(error);
    next(error);
  }
})

router.patch('/:userId/follow', isLoggendIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.params.userId }});
    if(!user) {
      res.status(403).send('없는 유저를 팔로우 했습니다.')
    }
    await user.addFollowers(req.user.id)
    res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
  } catch(error) {
    console.error(error);
    next(error);
  }
})

router.delete('/:userId/follow', isLoggendIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.params.userId }});
    if(!user) {
      res.status(403).send('없는 유저를 언팔로우 했습니다.')
    }
    await user.removeFollowers(req.user.id)
    res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
  } catch(error) {
    console.error(error);
    next(error);
  }
})

router.get('/followers', isLoggendIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id }});
    if(!user) {
      res.status(403).send('없는 유저를 언팔로우 했습니다.')
    }
    const followers =  await user.getFollowers()
    res.status(200).json(followers);
  } catch(error) {
    console.error(error);
    next(error);
  }
})

router.get('/followings', isLoggendIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id }});
    if(!user) {
      res.status(403).send('없는 유저를 언팔로우 했습니다.')
    }
    const followings =  await user.getFollowings()
    res.status(200).json(followings);
  } catch(error) {
    console.error(error);
    next(error);
  }
})

router.delete('/follower/:userId', isLoggendIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.params.userId }});
    if(!user) {
      res.status(403).send('없는 유저를 차단하려고 했습니다.')
    }
    await user.removeFollowings(req.user.id)
    res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
  } catch(error) {
    console.error(error);
    next(error);
  }
})

module.exports = router;