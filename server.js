const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/api/jokes", async (req, res) => {
  try {
    const response = await axios.get("https://v2.jokeapi.dev/joke/Any?type=single");
    res.json({
      fulfillmentResponse: {
        messages: [{
          text: {
            text: [response.data.joke]
          }
        }]
      }
    });
  } catch (error) {
    console.error("Joke API error:", error);
    res.json({
      fulfillmentResponse: {
        messages: [{
          text: {
            text: ["Sorry, I couldn't think of a joke right now. Try again later!"]
          }
        }]
      }
    });
  }
});

module.exports = app;
