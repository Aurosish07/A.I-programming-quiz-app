import express from "express"
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import axios from "axios"
import OpenAI from "openai";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 5500;

app.use(bodyParser.urlencoded({ extended: 1 }));



app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});





const openai = new OpenAI({ apiKey: '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' });

app.post("/submit", async (req, res) => {

  let btnradio = req.body.btnradio;
  let btnradio1 = req.body.btnradio1;
  let btnradio2 = req.body.btnradio2;

  const prompt = "Ask me a question on" + btnradio + " which is a " + btnradio1 + " question with " + btnradio2 + " level with answer";
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

    res.render("index.ejs" , {question:obj.question , option1:obj.options[0], option2:obj.options[1] , option3:obj.options[2] , option4:obj.options[3] , ans:obj.answer})
   console.log(obj)


  } catch (error) {
    console.error(error.messages);
  }


});



app.listen(port, () => {
  console.log("The server is runnning on the port", port);
})








//   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