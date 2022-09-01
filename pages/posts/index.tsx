import Link from 'next/link'
import { getAllPosts } from '../../lib/post';

export default function Posts({posts}: any){
    
    return <div>
        {posts.map((post: any) => {
            const {slug, frontmatter} = post;
            const {title, author, category, date, bannerImage, tags} = frontmatter;
             
            return <article key={title}>
                        <Link href = {`/posts/${slug}`}>
                            <h1>{title}</h1>
                        </Link>
                        <h3>{author}</h3>
                        <h3>{date}</h3>
                    </article>
        })}
        </div>
    
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