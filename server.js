const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Webhook endpoint for Moveo (POST method required)
app.post("/jokes", async (req, res) => {
  try {
    // Fetch joke from JokeAPI
    const response = await axios.get("https://v2.jokeapi.dev/joke/Any?type=single");
    
    // Format response according to Moveo's webhook requirements
    res.json({
      fulfillmentResponse: {
        messages: [{
          text: {
            text: [response.data.joke] // Array of strings (even if one message)
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
