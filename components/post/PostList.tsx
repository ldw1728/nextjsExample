import Link from "next/link";
import dateFormat from 'date-and-time';
import Pagination from '../common/Pagination'
import { useSession } from "next-auth/react";
import { useEffect } from "react";


//postListComponent
export default function postList({posts, pageIdx, queryArr}:any){
    const {data:session} = useSession();
    const {pagePosts, totPage} = setPostsForPage(posts, pageIdx);
    const path:string = (queryArr !== undefined && queryArr.length > 1) ? `${queryArr[0]}/${queryArr[1]}` : '/posts';
    
    useEffect(()=>{

    })
    
    return (
        <>      
            <div className="absolute border-2 bg-slate-200 border-slate-300 rounded-xl  
                            w-15 text-center p-2 font-semibold drop-shadow-md hover:scale-110 
                            hover:border-slate-400 duration-200 cursor-pointer hidden">write</div> 
            
            <div className='grid postgrid grid-cols-1 grid-rows-6 '>
            
            {
                pagePosts.map((post: any, idx:number) => {
                    const {slug, frontmatter} = post;
                    const {title, author, category, date, bannerImage, tag} = frontmatter;

                    return <Link href = {`/posts/${category}/${tag}/post/${slug}`} key={slug + idx}> 
                                <div key={slug + idx} className='post rounded-3xl drop-shadow-md border-2 border-slate-300 hover:border-slate-400'>                              
                                    <div key={'intro'+idx} className="">
                                        <a className="truncate">{title}</a>  
                                        <div >{author}</div>
                                    </div>                                    
                                    <div  key={'date'+idx} className='date'>{dateFormat.format(new Date(date), 'YYYY/MM/DD')}</div>                                                
                                </div>
                            </Link>
                })
            }
        <Pagination totPage={totPage} pageIdx={pageIdx} path={path}/>
        </div>
        </>
    )
}

function setPostsForPage(posts:any[], pageIdx:Number){
    var contentCnt:Number = 6; // 페이지당 포스트갯수
    var ltPostIdx:number = (Number(contentCnt) * Number(pageIdx))-1; //페이지의 마지막 포스트 인덱스
    var stPostIdx:number = Number(ltPostIdx+1) - Number(contentCnt); //페이지의 시작 포스트 인덱스
    var pagePosts = [];
    var totPage = Math.floor(Number(posts.length)/Number(contentCnt)) + 1;
    if(posts.length > stPostIdx){ //포스트들의 갯수가 해당페이지의 시작 인덱스 보다 클때
        if(posts.length-1 <= ltPostIdx){ //포스트들의 갯수 해당페이지의 마지막 인덱스와 같거나 작을 때
            ltPostIdx = posts.length; //포스트들 배열의 맨 끝 인덱스를 마지막인덱스로 한다.
        }

        var pagePosts = posts.slice(stPostIdx, ltPostIdx+1); //자름.
    }

    return {pagePosts, totPage};
}