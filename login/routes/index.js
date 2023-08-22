var express = require('express');
var router = express.Router();

const cors = require('cors');

app.use(cors({
  origin: '*',
}));


require('dotenv').config();

// const maria = require('../database/connect/mariadb');

// maria.queryreturn("show tables;").then(value=> {console.log(value)})

const { Configuration, OpenAIApi } = require("openai");

const configiration = new Configuration({
    organization: 'org-0uaQLaArF3m5pgctUePtq5OR',
    apiKey: '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'
});

console.log('<<--- Hello Node.js ---->>');
console.log('*- openai api tutorial...');

const openai = new OpenAIApi(configiration);
const data_schema = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Bucket List Keywords",
  "description": "A schema for defining main keywords and their associated details for a bucket list.",
  "type": "object",
  "properties": {
    "BucketList": {
      "type": "object",
      "description": "MainKeywords related to the bucket list",
      "properties": {
        "MainKeyword1": {
          "type": "object",
          "description": "Details related to MainKeyword1 for the bucket list",
          "properties": {
            "Value": { "type": "string", "description": "Main keyword1 to achieve bucket list" },
            "Details": {
              "type": "object",
              "properties": {
                "Detail1": { "type": "string", "description": "The first detail for MainKeyword1." },
                "Detail2": { "type": "string", "description": "The second detail for MainKeyword1." },
                "Detail3": { "type": "string", "description": "The third detail for MainKeyword1." },
                "Detail4": { "type": "string", "description": "The fourth detail for MainKeyword1." }
              },
              "required": ["Detail1", "Detail2", "Detail3", "Detail4"]
            }
          },
          "required": ["Value", "Details"]
        },
        "MainKeyword2": {
          "type": "object",
          "description": "Details related to MainKeyword2 for the bucket list",
          "properties": {
            "Value": { "type": "string", "description": "Main keyword2 to achieve bucket list" },
            "Details": {
              "type": "object",
              "properties": {
                "Detail1": { "type": "string", "description": "The first detail for MainKeyword2." },
                "Detail2": { "type": "string", "description": "The second detail for MainKeyword2." },
                "Detail3": { "type": "string", "description": "The third detail for MainKeyword2." },
                "Detail4": { "type": "string", "description": "The fourth detail for MainKeyword2." }
              },
              "required": ["Detail1", "Detail2", "Detail3", "Detail4"]
            }
          },
          "required": ["Value", "Details"]
        },
        "MainKeyword3": {
          "type": "object",
          "description": "Details related to MainKeyword3 for the bucket list",
          "properties": {
            "Value": { "type": "string", "description":"Main keyword3 to achieve bucket list"},
            "Details": {
              "type": "object",
              "properties": {
                "Detail1": { "type": "string", "description": "The first detail for MainKeyword3." },
                "Detail2": { "type": "string", "description": "The second detail for MainKeyword3." },
                "Detail3": { "type": "string", "description": "The third detail for MainKeyword3." },
                "Detail4": { "type": "string", "description": "The fourth detail for MainKeyword3." }
              },
              "required": ["Detail1", "Detail2", "Detail3", "Detail4"]
            }
          },
          "required": ["Value", "Details"]
        },
        "MainKeyword4": {
          "type": "object",
          "description": "Details related to MainKeyword4 for the bucket list",
          "properties": {
            "Value": { "type": "string", "description": "Main keyword4 to achieve bucket list" },
            "Details": {
              "type": "object",
              "properties": {
                "Detail1": { "type": "string", "description": "The first detail for MainKeyword4." },
                "Detail2": { "type": "string", "description": "The second detail for MainKeyword4." },
                "Detail3": { "type": "string", "description": "The third detail for MainKeyword4." },
                "Detail4": { "type": "string", "description": "The fourth detail for MainKeyword4." }
              },
              "required": ["Detail1", "Detail2", "Detail3", "Detail4"]
            }
          },
          "required": ["Value", "Details"]
        }
       
      }
    }
  }
}



const runGPT35 = async (prompt) => {
  const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
        role: "system",
        content: "Provide realistic solutions so you can achieve people's dreams one step closer"
        },
        { 
          role: "user", 
          content: prompt 
        }
      ],
      functions:[
        {
          name: "data_schema",
          description: "Using the given age, gender, occupation, and bucket list information, create four main keywords for achieving a bucket list that fits the situation, and four detailed keywords according to each main keyword",
          parameters: data_schema
        }
      ], 
      function_call:{ name: "data_schema"},
      temperature :0.7,
      top_p:1.0 ,
      frequency_penalty : 0.0,
      presence_penalty: 0.0,
      max_tokens : 1000
  });
  var output_schema = response.data.choices[0].message.function_call.arguments;
  return output_schema;
  // console.log(response.data.choices[0].message.content);
  //console.log(output_schema);
};

const runGPT35_t = async (prompt) => {
  const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
  });
  return response.data.choices[0].message.content;
};


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// 회원가입 API
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


//로그인 API
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


router.post("/ask/report", async (req, res) => {
  var gender = req.body.gender;
  var age = req.body.age;
  var job = req.body.job;
  var bucket = req.body.bucket;

    var propmt_sentence = 
    `직업: '${job}', 나이: '${age}',
    성별:'${gender}' 버킷리스트: '${bucket}'버킷리스트를 이루기 위해 
    필요한 메인 키워드 4개와 각각의 메인 키워드를 이루기 위한 
    세부 목표를 4개씩 json형태로 생성해줘`;

    const response = await runGPT35(propmt_sentence);
    const response_s = response.content;

      if (response) {
        const user = JSON.parse(response) // json.parse로 파싱
        res.json(user);
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

router.post("/ask/translate", async (req, res) => {
  var gender = req.body.gender;
  //var age = req.body.age;
  //var job = req.body.job;
  var bucket = req.body.bucket;

  var propmt_sentence = `
  이 사람의 성별은 '${gender}'이고, 버킷리스트는 '${bucket}'이다.
  앞 문장을 영어로 번역해줘`;

  const response = await runGPT35_t(propmt_sentence);

    if (response) {
      res.json({ response: response });
    } else {
      res.status(500).json({ error: "fail......" });
    }
  } 


);
module.exports = router;
