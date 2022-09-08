import { getAllPostsPaths, getPost, getCategoryList } from '../../../lib/post';
import ReactMarkdown from 'react-markdown'
import mdIt from 'markdown-it'; 
import dateFormat from 'date-and-time'
import {useRouter}  from 'next/router'
import Category from '../../../components/common/Caregory'

export default function Posts({frontmatter, content, categoryList} : any){
    const router = useRouter()
    console.log(router.query);
    const {title, author, date} = frontmatter;
    const md = new mdIt();
    const mdContent :string = md.render(content);
    return (<>
            <Category categoryList = {categoryList}/>
            <article className="prose lg:prose-xl prose-slate"> 
                <div className='post_Info py-10'>
                <div className='antialiased text-3xl py-5'>{title}</div>
                <div className='date antialiased italic font-thin text-sm float-right'>{dateFormat.format(new Date(date), 'YYYY/MM/DD HH:mm')}</div>
                </div>  
                <div className='antialiased' dangerouslySetInnerHTML={{__html:mdContent}}/>
                        
            </article>
            </>
    )
    
}


/*
static page생성을 위한 getStaticPaths, getStaticProps 은 빌드 시 한번만 동작한다.
*/

//동적 라우팅을 사용할 때 미리 정적빌드를 위함. post파일 경로들을 받아서 getStaticProps로 리턴.
export async function getStaticPaths(){
    const paths = await getAllPostsPaths();
    return {
        paths,
        fallback: false,
      };
}

// getStaticProps에서는 url의 slug(파일명)에맞는 파일의 데이터를 가져와 리턴.
export async function getStaticProps({params:{slug}}: any){
    const res = await getPost(slug);
    const resJson = JSON.parse(JSON.stringify(res));
    const categoryList = getCategoryList();
    return {
        props: {frontmatter:resJson.frontmatter, content:resJson.content, categoryList:categoryList}
    }
}