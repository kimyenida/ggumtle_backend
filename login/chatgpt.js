// const { Configuration, OpenAIApi } = require("openai");

// const configiration = new Configuration({
//     organization: 'org-0uaQLaArF3m5pgctUePtq5OR',
//     apiKey: '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',
// });

// console.log('<<--- Hello Node.js ---->>');
// console.log('*- openai api tutorial...');

// const openai = new OpenAIApi(configiration);
// const data_schema = {
//   "$schema": "http://json-schema.org/draft-07/schema#",
//   "title": "Bucket List Keywords",
//   "description": "A schema for defining main keywords and their associated details for a bucket list.",
//   "type": "object",
//   "properties": {
//     "BucketList": {
//       "type": "object",
//       "description": "MainKeywords related to the bucket list",
//       "properties": {
//         "MainKeyword1": {
//           "type": "object",
//           "description": "Details related to MainKeyword1 for the bucket list",
//           "properties": {
//             "Value": { "type": "string", "description": "Main keyword1 to achieve bucket list" },
//             "Details": {
//               "type": "object",
//               "properties": {
//                 "Detail1": { "type": "string", "description": "The first detail for MainKeyword1." },
//                 "Detail2": { "type": "string", "description": "The second detail for MainKeyword1." },
//                 "Detail3": { "type": "string", "description": "The third detail for MainKeyword1." },
//                 "Detail4": { "type": "string", "description": "The fourth detail for MainKeyword1." }
//               },
//               "required": ["Detail1", "Detail2", "Detail3", "Detail4"]
//             }
//           },
//           "required": ["Value", "Details"]
//         },
//         "MainKeyword2": {
//           "type": "object",
//           "description": "Details related to MainKeyword2 for the bucket list",
//           "properties": {
//             "Value": { "type": "string", "description": "Main keyword2 to achieve bucket list" },
//             "Details": {
//               "type": "object",
//               "properties": {
//                 "Detail1": { "type": "string", "description": "The first detail for MainKeyword2." },
//                 "Detail2": { "type": "string", "description": "The second detail for MainKeyword2." },
//                 "Detail3": { "type": "string", "description": "The third detail for MainKeyword2." },
//                 "Detail4": { "type": "string", "description": "The fourth detail for MainKeyword2." }
//               },
//               "required": ["Detail1", "Detail2", "Detail3", "Detail4"]
//             }
//           },
//           "required": ["Value", "Details"]
//         },
//         "MainKeyword3": {
//           "type": "object",
//           "description": "Details related to MainKeyword3 for the bucket list",
//           "properties": {
//             "Value": { "type": "string", "description":"Main keyword3 to achieve bucket list"},
//             "Details": {
//               "type": "object",
//               "properties": {
//                 "Detail1": { "type": "string", "description": "The first detail for MainKeyword3." },
//                 "Detail2": { "type": "string", "description": "The second detail for MainKeyword3." },
//                 "Detail3": { "type": "string", "description": "The third detail for MainKeyword3." },
//                 "Detail4": { "type": "string", "description": "The fourth detail for MainKeyword3." }
//               },
//               "required": ["Detail1", "Detail2", "Detail3", "Detail4"]
//             }
//           },
//           "required": ["Value", "Details"]
//         },
//         "MainKeyword4": {
//           "type": "object",
//           "description": "Details related to MainKeyword4 for the bucket list",
//           "properties": {
//             "Value": { "type": "string", "description": "Main keyword4 to achieve bucket list" },
//             "Details": {
//               "type": "object",
//               "properties": {
//                 "Detail1": { "type": "string", "description": "The first detail for MainKeyword4." },
//                 "Detail2": { "type": "string", "description": "The second detail for MainKeyword4." },
//                 "Detail3": { "type": "string", "description": "The third detail for MainKeyword4." },
//                 "Detail4": { "type": "string", "description": "The fourth detail for MainKeyword4." }
//               },
//               "required": ["Detail1", "Detail2", "Detail3", "Detail4"]
//             }
//           },
//           "required": ["Value", "Details"]
//         }
       
//       }
//     }
//   }
// }



// const runGPT35 = async (prompt) => {
//   const response = await openai.createChatCompletion({
//       model: "gpt-3.5-turbo",
//       messages: [{
//         "role": "system",
//         "content": "Provide realistic solutions so you can achieve people's dreams one step closer"
//     },
//     { role: "user", content: prompt }],
//     functions:[
//       {
//           "name": "data_schema",
//           "description": "Using the given age, gender, occupation, and bucket list information, create four main keywords for achieving a bucket list that fits the situation, and four detailed keywords according to each main keyword",
//           "parameters": data_schema
//       }
//   ], 
//   function_call:{
//     "name": "data_schema"
// },
// temperature :0.7,
// top_p:1.0 ,
// frequency_penalty : 0.0,
// presence_penalty: 0.0,
// max_tokens : 1000
//   });
//   var output_schema = response.data.choices[0].message.function_call.arguments;
//   // console.log(response.data.choices[0].message.content);
//   console.log(output_schema);
// };

// runGPT35("직업: 직장인, 나이: 26, 버킷리스트: 유럽여행가기\n\n버킷리스트를 이루기 위해 필요한 메인 키워드 4개와 각각의 메인 키워드를 이루기 위한 세부 목표를 4개씩 json형태로 생성해줘");

