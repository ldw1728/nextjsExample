import { getAllPostsPaths, getPost } from '../../lib/post';

export default function Posts({frontmatter, content} : any){
    const {title, author} = frontmatter
    console.log(frontmatter, content)
    return (
        <div>

        </div>
    )
    
}

export async function getStaticPaths(){
    const paths = await getAllPostsPaths();
    return {
        paths,
        fallback: false,
      };
}

export async function getStaticProps({params:{slug}}: any){
    const res = getPost(slug);
    return {
        props: res
    }
}