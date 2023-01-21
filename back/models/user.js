module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', { // MySQL에서는 users 테이블 생성
    email: {
      type: DataTypes.STRING(30),
      allowNull: false, // 필수
      unique: true, // 고유한 값
    },
    nickName: {
      type: DataTypes.STRING(10),
      allowNull : false,
      unique: true,
    },
    pw: {
      type: DataTypes.STRING(100),
      allowNull : false, // 필수
    },
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci', // 한글 저장
  });
  User.associate = (db) => {
    db.User.hasMany(db.Post);
    db.User.hasMany(db.Comment);
    db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked' });
    db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followers', foreignKey: 'FollowingId' }); // foreignKey 컬럼의 이름을 바꿈
    db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followings', foreignKey: 'FollowerId' });
  };
  return User
}