import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const response = await axios.get('https://v2.jokeapi.dev/joke/Any?type=single');

    if (response.data.error || !response.data.joke) {
      throw new Error('Joke API returned no joke');
    }

    return res.json({
      fulfillment_response: { // Use snake_case for Moveo
        messages: [{
          text: {
            text: [response.data.joke],
          },
        }],
      },
    });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({
      fulfillment_response: {
        messages: [{
          text: {
            text: ["Sorry, I couldn't think of a joke right now. Try again later!"],
          },
        }],
      },
    });
  }
}
