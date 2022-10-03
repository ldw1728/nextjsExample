import Link from "next/link";
import { useState } from "react";


interface CategoryInfo {
    mcate : string,
    scate : string[]
}

type CategoryProps = {
    categoryList : Array<CategoryInfo>
}

export default function Category(categoryProps:CategoryProps){

    const [cateItem, setCateItem] = useState([]);

    const categoryList = categoryProps.categoryList;

    
    return (
        <>
        <div className="category">
            {
                categoryList.map((categoryInfo:CategoryInfo)=>{
                    let mcateHref = `/posts/${categoryInfo.mcate}`; // 중카테고리 url
                    return (
                        <ul className="m_cate antialiased" key={categoryInfo.mcate}>
                            <li>
                            <a>
                            <div className="m_cate_title font-bold text-xl  text-slate-600" key={categoryInfo.mcate}> {categoryInfo.mcate}</div> 
                            </a>
                                <ul className="s_cate pl-5 ">
                                    {
                                        categoryInfo.scate.map((scate)=>{
                                            let scateHref = `${mcateHref}/${scate}`; // 소카테고리 url
                                            return (
                                                <li key={scate}>
                                                    <Link href={scateHref} >
                                                    <div key={scate} className="s_cate_title font-semibold text-lg  text-slate-300">{scate}</div>
                                                    </Link>
                                                </li>
                                            );
                                        })
                                    }
                                </ul>
                            </li>
                        </ul>
                    )
                })
            }
            </div>
        </>
    )
}
