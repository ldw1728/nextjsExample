import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from "next-auth/react";

type Data = {
  name: string
}

export default async function (
  req: NextApiRequest,
  res: NextApiResponse
) {

    const session = await getSession({req});

    let status = 403;
    let jsonData = '';
    
    if(session){
      status = 200;
      jsonData = JSON.stringify(session);
    }
    
    res.status(status).json(jsonData);
}