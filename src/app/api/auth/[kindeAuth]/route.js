import { handleAuth } from '@kinde-oss/kinde-auth-nextjs/server';

export const runtime = 'edge'; // Set the runtime directly

export const GET = async (req) => {
  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': 'https://casecobra-dev-clone.vercel.app',
        'Access-Control-Allow-Methods': 'GET, OPTIONS, POST, PUT, DELETE',
        'Access-Control-Allow-Headers': 'X-CSRF-Token, X-Requested-With, Accept, Content-Type, Authorization',
        'Access-Control-Allow-Credentials': 'true',
      },
    });
  }

  // Handle the actual GET request
  const response = await handleAuth()(req);
  
  // Set CORS headers for the response
  response.headers.set('Access-Control-Allow-Origin', 'https://casecobra-dev-clone.vercel.app');
  response.headers.set('Access-Control-Allow-Credentials', 'true');

  return response;
};