module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', { // MySQL에서는 users 테이블 생성
    content: {
      type: DataTypes.TEXT,
      allowNull : false,
    },
  }, {
    charset: 'utf8mb4', //mb4 이모티콘저장 가능
    collate: 'utf8mb4_general_ci', // 한글 저장
  });
  Post.associate = (db) => {
    db.Post.belongsTo(db.User); // post.addUser, post.getUser, post.setUser
    db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' }); // 다대다 post.addHashtags
    db.Post.hasMany(db.Comment); // post.addComments, post.getComments
    db.Post.hasMany(db.Image); // 다대일 post.addImages, post.getImages
    db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers' }); // post.addLikers, post.removeLikers
    db.Post.belongsTo(db.Post, { as: 'Retweet' }); // post.addRetweet (단수)
  };
  return Post
}