module.exports = (sequelize, DataTypes) => {
  const Hashtag = sequelize.define('Hashtag', { // MySQL에서는 users 테이블 생성
    name: {
      type: DataTypes.STRING(20),
      allowNull : false,
    },
  }, {
    charset: 'utf8mb4', //mb4 이모티콘저장 가능
    collate: 'utf8mb4_general_ci', // 한글 저장
  });
  Hashtag.associate = (db) => {
    db.Hashtag.belongsToMany(db.Post, { through: 'PostHashtag' }); // 다대다
  };
  return Hashtag
}