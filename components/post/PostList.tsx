import Link from "next/link";
import dateFormat from 'date-and-time';

//postListComponent
export default function postList({posts}:any){

    return (
        <>
            <div className='grid postgrid gap-10 grid-cols-3 grid-rows-3 '>
            {
                posts.map((post: any) => {
                    const {slug, frontmatter} = post;
                    const {title, author, category, date, bannerImage, tag} = frontmatter;

                    return <Link href = {`/posts/${category}/${tag}/${slug}`}>
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

    )
}