var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
// const cors = require('cors');

// app.use(cors({
//   origin: "http://localhost:3000",
// }));

console.log("시작시작");

// mariaDB연결 부분
//const maria =require('./database/connect/mariadb');
//maria.connect();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


app.get("/ask/report/api", cors(),async (req, res) => {
  var gender = req.gender;
  var age = req.age;
  var job = req.job;
  var bucket = req.bucket;

    var propmt_sentence = 
    `직업: '${job}', 나이: '${age}',
    성별:'${gender}' 버킷리스트: '${bucket}'버킷리스트를 이루기 위해 
    필요한 메인 키워드 4개와 각각의 메인 키워드를 이루기 위한 
    세부 목표를 4개씩 json형태로 생성해줘`;

    const response = await runGPT35(propmt_sentence);
    const response_s = response.content;

      if (response) {
        const user = JSON.parse(response) // json.parse로 파싱
        res.send(user);
        //res.json(user);
        console.log(user.BucketList.MainKeyword1.Value)
        console.log(user.BucketList.MainKeyword1.Details.Detail1)
        // console.log(response_s.BucketList.MainKeyword1.Value);
        // console.log(response_s.BucketList.MainKeyword1.Details.Detail1);

       // res.json({ response: response_s });
      } else {
        res.status(500).json({ error: "fail......" });
      }
    } 
  
);

app.get("/usus", (req, res) => {

  //Hello World 데이터 반환
  res.send("Hello World");
});

app.get('*', function(req, res){
  res.status(404).send('what???');
});


module.exports = app;
