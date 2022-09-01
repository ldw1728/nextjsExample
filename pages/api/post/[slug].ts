import fs from 'fs';
import matter from 'gray-matter'; //마크다운파일의 메타데이터를 파싱하기위한 라이브러리.
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
  ) {
    let paths = null;
    if(req.method === 'GET'){
      const files = fs.readFileSync('postContents'); 

      //paths = files.map((fileName : String)=>({params:{slug: fileName.replace(".md", "")}}));
    }
    res.status(200).json(paths);
    
  }