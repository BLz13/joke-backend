const axios = require("axios");

// This function is the Vercel serverless function that handles Moveo's webhook requests.
module.exports = async (req, res) => {
  // Ensure the request method is POST since Moveo sends POST requests.
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    // Fetch a joke from JokeAPI.
    // Using the "Any" category and requesting a single-part joke.
    const response = await axios.get("https://v2.jokeapi.dev/joke/Any?type=single");

    // Extract the joke text.
    const joke = response.data.joke;

    // Construct the response in the format Moveo expects.
    // Moveo's documentation shows that the response should include a fulfillmentResponse with messages.
    const payload = {
      fulfillmentResponse: {
        messages: [
          {
            text: {
              text: [joke]  // Note: this is an array with one message string.
            }
          }
        ]
      }
    };

    // Send the response.
    res.json(payload);
  } catch (error) {
    console.error("Error fetching joke:", error);

    // Respond with a fallback message if something goes wrong.
    res.json({
      fulfillmentResponse: {
        messages: [
          {
            text: {
              text: ["Sorry, I couldn't fetch a joke at this time. Please try again later."]
            }
          }
        ]
      }
    });
  }
};
