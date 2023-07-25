var express = require('express');
var router = express.Router();

const maria = require('../database/connect/mariadb');

maria.queryreturn("show tables;").then(value=> {console.log(value)})


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// router.get('/api/get/login', function(req,res){
//   res.status(200).json({
//     "message" : "로그인 api 페이지(get)입니다!"
//   });
// });

// router.post('/api/post/login', function(req,res){
//   res.status(200).json({
//     "message" : "로그인 api 페이지(post)입니다!"
//   });
// });


// 회원가입 api
router.post('/reg',async(req,res)=>{
  var id = req.body.user_id;
  var pwd = req.body.user_pwd;
  var idoverlap = await maria.queryreturn(`select * from login where ID = '${id}' and PASSWORD = '${pwd}';`)
  if(idoverlap == 0){
    var regquery = await maria.queryreturn(`insert into login(ID,PASSWORD) values('${id}','${pwd}')`)
    if(regquery == 0){
      res.send("다시 시도해주세요!")
    } else{
      res.send("회원가입 성공!")
    }
  }
  else{
    res.send("이미 등록된 계정이 있습니다.")
  }
});


//로그인 api
router.post('/login', async function(req, res){
  var id = req.body.user_id;
  var pwd = req.body.user_pwd;
  var results = await maria.queryreturn(`select * from login where ID = '${id}' and PASSWORD = '${pwd}';`)
  if(results == 0){
    res.send("아이디 또는 비밀번호가 틀렸습니다")
  } else{
    var uid = results[0].ID;
    res.send(`로그인 성공! '${uid}'님 안녕하세요!`)
  }
});

module.exports = router;
