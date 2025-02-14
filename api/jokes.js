const axios = require("axios");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

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
};
