import Link from "next/link";


export default function Pagination({totPage, pageIdx, path}:any){
    // console.log(totPage, pageIdx, path)
    const pageNumArr = setPageNum(totPage);
    return (
        <>
        <div className="pagination">
        { 
            pageNumArr.map((pageNum)=>{
                let cn = (pageIdx == pageNum) ? 'pagebtn currpagebtn' : 'pagebtn';
                return (
                    
                    <Link key={pageNum} href={`${path}/${pageNum}`}>
                        <span className={cn}>{pageNum} </span>      
                    </Link>
                )
            })
        }
        </div>
        </>        
    )
}

function setPageNum(totPage:number){
    let pageNum:Array<number> = [];

    for(let i = 1 ; i <= totPage ; i++){
        pageNum.push(i);
    }

    return pageNum;
}