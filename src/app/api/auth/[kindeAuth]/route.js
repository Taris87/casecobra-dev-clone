import { handleAuth } from "@kinde-oss/kinde-auth-nextjs/server";

export const GET = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Call handleAuth and ensure it returns a JSON response
    const authResponse = await handleAuth()(req, res);

    // Assuming handleAuth returns a response object, ensure it is JSON
    if (!authResponse.headers.get('content-type')?.includes('application/json')) {
      return res.status(500).json({ message: 'Invalid response format' });
    }

    // Return the JSON response
    return res.status(authResponse.status).json(await authResponse.json());
  } catch (error) {
    console.error('Error in authentication:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};