import { NextApiRequest, NextApiResponse } from "next";
import fs from 'fs';

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
){
    const files = fs.readdirSync('postContents');
    const paths = files.map((fileName)=>({params:{slug:fileName.replace('.md', '')}}));
    res.status(200).send(paths);
}