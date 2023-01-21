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
  Post.associate = (db) => {};
  return Post
}