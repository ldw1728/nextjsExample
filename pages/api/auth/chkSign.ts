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
    
    if(session !== null){
      res.status(200).send(session);
    }
    else
      res.redirect('/');
}