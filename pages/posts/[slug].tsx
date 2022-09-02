import { getAllPostsPaths, getPost } from '../../lib/post';
import ReactMarkdown from 'react-markdown'
import mdIt from 'markdown-it';

export default function Posts({frontmatter, content} : any){
    const {title, author, date} = frontmatter;
    const md = new mdIt();
    const mdContent :String = md.render(content);
    return (<>
        <article className="prose lg:prose-xl prose-slate"> 
            <div>
            <p>{title}</p>
            <p>{author}</p>
            <p>{date}</p>
            </div>
            <p  />           
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
    return {
        props: resJson
    }
}