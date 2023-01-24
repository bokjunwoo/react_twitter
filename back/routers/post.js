const express = require('express');
const { Post, Image, Comment, User } = require('../models');
const user = require('../models/user');
const { isLoggendIn } = require('./middlewares')

const router = express.Router();

router.post('/', isLoggendIn, async (req, res, next) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id
    });
    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [{
        model: Image,
      }, {
        model: Comment,
        include: [{
          model: User,
          attributes: ['id', 'nickName']
        }]
      }, {
        model: User,
      }]
    })
    res.status(201).json(fullPost)
  } catch(error) {
    console.error(error)
    next(error)
  }
});

router.post('/:postId/comment', isLoggendIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId }
    })
    if(!post) {
      return res.status(403).send('존재하지 않는 게시글 입니다.')
    }
    const comment = await Comment.create({
      content: req.body.content,
      PostId: parseInt(req.params.postId, 10),
      UserId: req.user.id
    });
    const fullComment = await Comment.findOne({
      where: { id: comment.id },
      include: [{
        model: User,
        attributes: ['id', 'nickName']
      }]
    })
    res.status(201).json(fullComment)
  } catch(error) {
    console.error(error)
    next(error)
  }
});

module.exports = router;