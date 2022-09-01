import fs from 'fs';
import matter from 'gray-matter'; //마크다운파일의 메타데이터를 파싱하기위한 라이브러리.
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    contents: Array<any>
  }

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
  ) {
    let result:Data = {contents:[]};
    if(req.method === 'GET'){
      const files = fs.readdirSync('postContents'); 

      const posts = files.map((fileName : String)=>{
        const slug = fileName.replace('.md', '');
        const readFile = fs.readFileSync(`postContents/${fileName}`);
        const {data : frontmatter} = matter(readFile);

        return {slug, frontmatter};
      });
      result.contents = posts;
    }
    res.status(200).json(result);
    
  }