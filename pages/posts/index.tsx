import Link from 'next/link'
import { getAllPosts } from '../../lib/post';

export default function Posts({posts}: any){
    
    return <>
        <div className='grid gap-10 grid-cols-3 grid-rows-3 '>
            {
                posts.map((post: any) => {
                    const {slug, frontmatter} = post;
                    const {title, author, category, date, bannerImage, tags} = frontmatter;
                    
                    return <Link href = {`/posts/${slug}`}>
                                <div className='post rounded-3xl drop-shadow-md border-2 border-slate-300 hover:border-slate-400'>                               
                                    <a>{title}</a>  
                                    <div >{author}</div>
                                    <div >{date}</div>                                                
                                </div>
                            </Link>
                })
            }
        </div>
        </>
    
}   

export async function getStaticProps(){
    const posts:Array<any> = await getAllPosts();
    //const posts = await getAllPosts().then((res)=>{ return res.contents});
    return {
        props : {
            posts:JSON.parse(JSON.stringify(posts))
        }
    }
}