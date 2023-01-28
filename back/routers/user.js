const express = require('express');
const bcrypt = require('bcrypt')
const { User, Post, Image, Comment } = require('../models');
const { isLoggendIn, isNotLoggendIn } = require('./middlewares')
const { Op } = require('sequelize');
const passport = require('passport');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
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
  } catch (error) {
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
  } catch (error) {
    console.error(error);
    next(error);
  }
})

router.get('/followers', isLoggendIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    if (!user) {
      res.status(403).send('없는 유저를 언팔로우 했습니다.')
    }
    const followers = await user.getFollowers({
      limit: parseInt(req.query.limit, 10)
    })
    res.status(200).json(followers);
  } catch (error) {
    console.error(error);
    next(error);
  }
})

router.get('/followings', isLoggendIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    if (!user) {
      res.status(403).send('없는 유저를 언팔로우 했습니다.')
    }
    const followings = await user.getFollowings({
      limit: parseInt(req.query.limit, 10)
    })
    res.status(200).json(followings);
  } catch (error) {
    console.error(error);
    next(error);
  }
})

router.delete('/follower/:userId', isLoggendIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.params.userId } });
    if (!user) {
      res.status(403).send('없는 유저를 차단하려고 했습니다.')
    }
    await user.removeFollowings(req.user.id)
    res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
})

router.get('/:userId', async (req, res, next) => { // GET /user/1
  try {
    const fullUserWithoutPassword = await User.findOne({
      where: { id: req.params.userId },
      attributes: {
        exclude: ['pw']
      },
      include: [{
        model: Post,
        attributes: ['id'],
      }, {
        model: User,
        as: 'Followings',
        attributes: ['id'],
      }, {
        model: User,
        as: 'Followers',
        attributes: ['id'],
      }]
    })
    if (fullUserWithoutPassword) {
      const data = fullUserWithoutPassword.toJSON();
      data.Posts = data.Posts.length; // 개인정보 침해 예방
      data.Followers = data.Followers.length;
      data.Followings = data.Followings.length;
      res.status(200).json(data);
    } else {
      res.status(404).json('존재하지 않는 사용자입니다.');
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.patch('/:userId/follow', isLoggendIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.params.userId } });
    if (!user) {
      res.status(403).send('없는 유저를 팔로우 했습니다.')
    }
    await user.addFollowers(req.user.id)
    res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
})

router.delete('/:userId/follow', isLoggendIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.params.userId } });
    if (!user) {
      res.status(403).send('없는 유저를 언팔로우 했습니다.')
    }
    await user.removeFollowers(req.user.id)
    res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
  } catch (error) {
    console.error(error);
    next(error);
  }
})

router.get('/:userId/posts', async (req, res, next) => { // GET /user/1/posts
  try {
    const where = { UserId: req.params.userId };
    if (parseInt(req.query.lastId, 10)) { // 초기 로딩이 아닐 때
      where.id = { [Op.lt]: parseInt(req.query.lastId, 10)}
    } // 21 20 19 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1
    const posts = await Post.findAll({
      where,
      limit: 10,
      order: [['createdAt', 'DESC']],
      include: [{
        model: User,
        attributes: ['id', 'nickName'],
      }, {
        model: Image,
      }, {
        model: Comment,
        include: [{
          model: User,
          attributes: ['id', 'nickName'],
          order: [['createdAt', 'DESC']],
        }],
      }, {
        model: User, // 좋아요 누른 사람
        as: 'Likers',
        attributes: ['id'],
      }, {
        model: Post,
        as: 'Retweet',
        include: [{
          model: User,
          attributes: ['id', 'nickName'],
        }, {
          model: Image,
        }]
      }],
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;