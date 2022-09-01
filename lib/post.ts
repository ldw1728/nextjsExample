import fs from 'fs';
import matter from 'gray-matter'; //마크다운파일의 메타데이터를 파싱하기위한 라이브러리.
const apiUrl = 'http://localhost:3000';

async function getApiResource(params:any) {
    const result = await fetch(apiUrl+params.url);
    const contents = await result.json();
    return contents;
}


export async function getAllPostsPaths(){
    const files = fs.readdirSync('postContents');
    const paths = files.map((fileName)=>({params:{slug:fileName.replace('.md', '')}}));
    return paths;
}

export async function getPost(slug:String){
    const fileName = fs.readFileSync(`postContents/${slug}.md`, 'utf-8');
    const {data:frontmatter, content} = matter(fileName);
    return {data:frontmatter, content};
}

export async function getAllPosts(){
    const files = fs.readdirSync('postContents'); 

      const posts = files.map((fileName : String)=>{
        const slug = fileName.replace('.md', '');
        const readFile = fs.readFileSync(`postContents/${fileName}`);
        const {data : frontmatter} = matter(readFile);

        return {slug, frontmatter};
      });

      return posts;
}