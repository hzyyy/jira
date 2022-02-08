module.exports = (req, res, next) => {
  console.log(req.path)
  if(req.path === '/login') {
    if(req.body.username === '585318' && req.body.password === '123456') {
      return res.status(200).json({
        user: { token: '123123' }
      })
    }else {
      return res.status(400).json({
        message: 'Invalid username or password'
      })
    }
  }

  next()
}