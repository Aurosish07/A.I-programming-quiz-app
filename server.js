import express from "express"
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import axios from "axios"
import OpenAI from "openai";
import 'dotenv/config';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 5500;

app.use(bodyParser.urlencoded({ extended: 1 }));



app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});





const openai = new OpenAI({ apiKey: `${process.env.OPENAI_API_KEY}` });

app.post("/submit", async (req, res) => {

  let btnradio = req.body.btnradio;
  // let btnradio1 = req.body.btnradio1;
  let btnradio2 = req.body.btnradio2;

  const prompt = `Ask me a multiple-choice question on ${btnradio} with ${btnradio2} level where options should be in an array, and there should be an option that exactly matches the answer including symbols and spaces and there should only one correct answer of every question . If the question contains any code snippet, please include it in your response only in 'code' header.`;
  try {

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant designed to output JSON.",

        },
        { role: "user", content: prompt },
      ],
      model: "gpt-3.5-turbo-1106",
      response_format: { type: "json_object" },
    });

    let result = completion.choices[0].message.content;
    let obj = JSON.parse(result);
    let code = obj.code;

    res.render("index.ejs", { question: obj.question, option1: obj.options[0], option2: obj.options[1], option3: obj.options[2], option4: obj.options[3], ans: obj.answer, code: code, body: req.body });

    console.log(prompt);
    console.log(result);
    console.log(obj);





  } catch (error) {
    console.error(error.messages);
  }


});



app.listen(port, () => {
  console.log("The server is runnning on the port", port);
})








//new key : - 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