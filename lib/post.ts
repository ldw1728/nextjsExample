import fs from 'fs';
import matter from 'gray-matter'; //마크다운파일의 메타데이터를 파싱하기위한 라이브러리.


type type_frontmatter = {
  title: String,
  author: String,
  description: String,
  date: Date,
  category: String,
  tag: String
}

type CategoryInfo = {
  mcate : String,
  scate : String[]
}

let categoryList: Array<CategoryInfo> = [];

getAllPosts().then((posts)=>{categoryList = createCategory(posts)});

/*
fs로 파일에 접근하여 데이터 리턴.
*/
export async function getAllPostsPaths(){
    const files = fs.readdirSync('postContents');
    const paths = files.map((fileName)=>{
      return {params:{tag:'dev', slug:fileName.replace('.md', '')}}
    });
    
    return paths;
}

export async function getAllCategoryPaths(){

  categoryList = await getCategoryList();

    let paths:any[] = [
      {params:{tag:[]}}
    ];

    categoryList.forEach((categoryInfo)=>{
      paths.push({params:{tag:[categoryInfo.mcate]}});
      categoryInfo.scate.forEach((scateStr:String)=>{
        paths.push({params:{tag: [categoryInfo.mcate, scateStr]}});
      });
    })
  
  return paths;
}

export async function getPost(slug:String){
    const fileName = fs.readFileSync(`postContents/${slug}.md`, 'utf-8');
    const {data:frontmatter, content} = matter(fileName);
    return {frontmatter, content};
}

export async function getAllPosts(){
    const files = fs.readdirSync('postContents'); 

      const posts:any[] = files.map((fileName : String)=>{
        const slug = fileName.replace('.md', '');
        const readFile = fs.readFileSync(`postContents/${fileName}`);
        const {data : frontmatter} = matter(readFile);
        return {slug, frontmatter};
      });
      //categoryList = createCategory(posts); //카테고리 세팅.
      return posts;
}

function createCategory(posts:any[]){
      let tmp:Array<CategoryInfo> = [];

      posts.forEach(e=>{
        const {category, tag} = e.frontmatter; 
        let res:number = tmp.findIndex((e)=>e.mcate === category);
        if(res>-1){
          tmp.at(res)?.scate.push(tag);
        }
        else tmp.push({mcate:category, scate:[tag]});
      })
      return tmp;


}

export async function getCategoryList(){
  if(categoryList.length <= 0){
    console.log('return categoryList empty');
    const posts = await getAllPosts();
    categoryList = createCategory(posts);
  }

    return categoryList;
}