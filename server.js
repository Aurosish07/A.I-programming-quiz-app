import express from "express"
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import axios from "axios"

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 5500;

app.use(bodyParser.urlencoded({extended:1}));



app.get("/", (req, res) => {
    res.sendFile(__dirname+"/public/index.html");
})

// app.post("/submit" , (req , res) => {
//     console.log(req.body);
//     res.render("index.ejs");
// })


app.post("/submit", async (req, res) => {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/engines/davinci-codex/completions',
        {
          prompt: `Generate multiplechoise questions on ${req.body.btnradio} with ${req.body.btnradio2} level`, // Use the question from the request body
          max_tokens: 300,
          temperature: 0.7,
        },
        {
          headers: {
            'Authorization': `Bearer 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`, // Replace with your actual API key
            'Content-Type': 'application/json',
          },
        }
      );
  
  
      const generatedQuiz = response.data.choices[0].text.trim();
      console.log(generatedQuiz);
      res.render(index.ejs , {question:generatedQuiz});
      // ...
    } catch (error) {
      console.error(error);
    }
});



app.listen(port, () => {
    console.log("The server is runnning on the port", port);
})








//   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