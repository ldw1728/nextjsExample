import fs from 'fs';
import matter from 'gray-matter'; //마크다운파일의 메타데이터를 파싱하기위한 라이브러리.
import {Pagination} from './Pagination'


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


var categoryList: Array<CategoryInfo> = [];
var posts_init:Array<any> = [];


// js파일로드시 실행. 모든 post들을 조회하여 카테고리 생성. ()
getAllPosts().then((posts)=>{categoryList = createCategory(posts);posts_init=posts});

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

// 카테고리 경로 생성.
export async function getAllCategoryPaths(){
  //생성된 카테고리를 이용하여 경로를 생성한다.

  categoryList = await getCategoryList();

    let paths:any[] = [
      {params:{tag:[]}}
    ];

        categoryList.forEach((categoryInfo)=>{
        //paths.push({params:{tag:[categoryInfo.mcate]}});
        categoryInfo.scate.forEach((scateStr:String)=>{
          paths.push({params:{tag: [categoryInfo.mcate, scateStr]}}); 
          //정적경로를 세팅할 때 params안에 tag는 동적라우팅파일 이름과 동일한 변수명을 사용한다.
          //만약 파일명이 [id].tsx 면 변수명도 id.
          // [cate]/[id].tsx => {params:{cate:'', id:''}}
          // [cate]/[...id].tsx => {params:{cate:'', id:[]}}
        });
      })

      // // 실제 post파일 경로도 추가해준다.
      posts_init.forEach((post, idx)=>{
        let fm = post.frontmatter;
        //paths.push({params:{tag:[String(Math.floor(idx/6) + 1)]}});
        paths.push({params:{tag:[fm.category, fm.tag, post.slug]}});
      });
    

  return paths;
}

// post상세조회
export async function getPost(slug:String){
    const fileName = fs.readFileSync(`postContents/${slug}.md`, 'utf-8');
    const {data:frontmatter, content} = matter(fileName);
    return {frontmatter, content};
}

//모든 post 조회
export async function getAllPosts(tag:Array<String> = []){ //매개변수 기본값을 빈값으로 초기화.
    const files = fs.readdirSync('postContents'); 

      let posts:any[] = files.map((fileName : String)=>{
        const slug = fileName.replace('.md', '');
        const readFile = fs.readFileSync(`postContents/${fileName}`);
        const {data : frontmatter} = matter(readFile);
        return {slug, frontmatter};
      });

      // 쿼리스트링으로 받아온 경로에 맞게 카테고리 별로 구분하여 보여주기위한 로직.
      if(tag.length > 1){ //쿼리스트링이 존재할 경우
        posts = posts.filter(e=>{ 
          if(e.frontmatter.category == tag[0]){ //같은 카테고리
              if(tag[1]){ // 쿼리스트링에 tag가 존재하면
                  if(e.frontmatter.tag == tag[1]) return true; //비교하여 같을 경우 true
              }
              else return true;
          }
        })
      }

      return posts;
}

/*
카테고리 생성.
모든 post들을 조회, post안에 명시된 category를 기준으로 생성한다.
*/
function createCategory(posts:any[]){

      let categoryLst:Array<CategoryInfo> = [];

      //모든 post들을 조회
      posts.forEach(e=>{

        const {category, tag} = e.frontmatter; 
        let res:number = categoryLst.findIndex((e)=>e.mcate === category);

        if(res>-1){ //categoryLst에 저장되어있다면 
          let scateArr:any = categoryLst.at(res)?.scate;

          if(scateArr?.findIndex((e:String)=>e===tag) < 0) //categoryLst에 scate가 저장이안되어있다면
            scateArr.push(tag); //기존 mcate에 scate push
        }
        else categoryLst.push({mcate:category, scate:[tag]}); //mcate, scate 추가
      })

      return categoryLst;
}

export async function getCategoryList(){
  if(categoryList.length <= 0){
    console.log('return categoryList empty');
    const posts = await getAllPosts();
    categoryList = createCategory(posts);
  }

    return categoryList;
}