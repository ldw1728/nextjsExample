import Link from 'next/link'
import { getAllPosts, getCategoryList, getAllCategoryPaths } from '../../lib/post';
import dateFormat from 'date-and-time'
import Category from '../../components/common/Caregory'
import {useRouter}  from 'next/router'

export default function Posts({posts, categoryList}: any){
    const router = useRouter()
    console.log(router.query)
    //const dateFns.format(date, 'yyyy-MM-dd')
    return <>
        <Category categoryList={categoryList}/>
        <div className='grid postgrid gap-10 grid-cols-3 grid-rows-3 '>
            {
                posts.map((post: any) => {
                    const {slug, frontmatter} = post;
                    const {title, author, category, date, bannerImage, tags} = frontmatter;

                    return <Link href = {`/posts/${slug}`}>
                                <div className='post rounded-3xl drop-shadow-md border-2 border-slate-300 hover:border-slate-400'>                               
                                    <a>{title}</a>  
                                    <div >{author}</div>
                                    <div className='date'>{dateFormat.format(new Date(date), 'YYYY/MM/DD')}</div>                                                
                                </div>
                            </Link>
                })
            }
        </div>
        </>
    
}   


export async function getStaticPaths(){
    const paths = await getAllCategoryPaths();
    
    return {
        paths,
        fallback: false,
      };
}

export async function getStaticProps({params:{tag}}: any){
    const posts:Array<any> = await getAllPosts();
    //const posts = await getAllPosts().then((res)=>{ return res.contents});
    const categoryList = await getCategoryList();
    return {
        props : {
            posts:JSON.parse(JSON.stringify(posts)), categoryList:categoryList
        }
    }
}