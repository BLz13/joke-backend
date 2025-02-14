import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const response = await axios.get('https://v2.jokeapi.dev/joke/Any?type=single');

    return res.json({
      fulfillmentResponse: {
        messages: [
          {
            text: {
              text: [response.data.joke], // Moveo's expected format
            },
          },
        ],
      },
    });
  } catch (error) {
    console.error('Joke API error:', error);
    return res.json({
      fulfillmentResponse: {
        messages: [
          {
            text: {
              text: ["Sorry, I couldn't think of a joke right now. Try again later!"],
            },
          },
        ],
      },
    });
  }
}
