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

  const prompt = "Ask me a question on" + btnradio + " which is a " + btnradio1 + " question with " + btnradio2 + " level ";
  try {

    async function main() {
      const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: prompt }],
        model: "gpt-3.5-turbo",
      });


      const resp = completion.choices[0];
      const responseWithOptions = resp.message.content.replace("[Option 1]", "Your Option 1")
        .replace("[Option 2]", "Your Option 2")
        .replace("[Option 3]", "Your Option 3");

        
      res.render("index.ejs", { content:responseWithOptions});
    }

    main();

  } catch (error) {
    console.error(error.messages);
  }


});



app.listen(port, () => {
  console.log("The server is runnning on the port", port);
})








//   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