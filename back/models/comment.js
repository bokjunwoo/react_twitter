module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', { // MySQL에서는 users 테이블 생성
    content: {
      type: DataTypes.TEXT,
      allowNull : false,
    },
  }, {
    charset: 'utf8mb4', //mb4 이모티콘저장 가능
    collate: 'utf8mb4_general_ci', // 한글 저장
  });
  Comment.associate = (db) => {
    db.Comment.belongsTo(db.User);
    db.Comment.belongsTo(db.Post);
  };
  return Comment
}