module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', { // MySQL에서는 users 테이블 생성
    src: {
      type: DataTypes.STRING(200),
      allowNull : false,
    },
  }, {
    charset: 'utf8', //mb4 이모티콘저장 가능
    collate: 'utf8_general_ci', // 한글 저장
  });
  Image.associate = (db) => {
    db.Image.belongsTo(db.Post);
  };
  return Image
}