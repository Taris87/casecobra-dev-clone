

import { handleAuth } from "@kinde-oss/kinde-auth-nextjs/server";

export const GET = async (req, res) => {
  
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    
    return res.status(200).end();
  }

  
  return handleAuth()(req, res);
};