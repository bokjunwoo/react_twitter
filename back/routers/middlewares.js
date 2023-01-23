exports.isLoggendIn = (req, res, next) => {
  if(req.isAuthenticated()) {
    next(); // 인지가 없으면 다음 미들웨워로 간다
  } else {
    res.status(401).send('로그인이 필요합니다.')
  }
}

exports.isNotLoggendIn = (req, res, next) => {
  if(!req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send('로그인하지 않은 사용자만 접근 가능합니다.')
  }
}