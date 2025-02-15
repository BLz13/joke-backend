export default async function handler(req, res) {
  try {
    // Fetch from JokeAPI
    const jokeResponse = await fetch('https://v2.jokeapi.dev/joke/Any');
    const jokeData = await jokeResponse.json();

    // Build the text from the joke
    let jokeText;
    if (jokeData.type === 'single') {
      // Single-liner
      jokeText = jokeData.joke;
    } else if (jokeData.type === 'twopart') {
      // Two-part joke
      jokeText = `${jokeData.setup}\n${jokeData.delivery}`;
    } else {
      // Fallback if the API returns something unexpected
      jokeText = 'No joke found!';
    }

    // IMPORTANT: Return the data in the format Moveo expects.
    // For instance, use "responses" with one text message:
    res.status(200).json({
      responses: [
        {
          "type": "text",
          "texts": [jokeText]
        }
      ]
    });
  } catch (error) {
    console.error(error);

    // Return a fallback response in Moveo format if something fails
    res.status(500).json({
      responses: [
        {
          type: 'text',
          content: 'Oops, something went wrong while fetching the joke!'
        }
      ]
    });
  }
}
