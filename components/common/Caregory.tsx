import Link from "next/link";
import { useState } from "react";


interface CategoryInfo {
    mcate : String,
    scate : String[]
}

type CategoryProps = {
    categoryList : Array<CategoryInfo>
}

export default function Category(categoryProps:CategoryProps){

    const [cateItem, setCateItem] = useState([]);

    const categoryList = categoryProps.categoryList;

    
    return (
        <>
        <div className="category text-slate-300">
            {
                categoryList.map((categoryInfo:CategoryInfo)=>{
                    let mcateHref = `/posts/${categoryInfo.mcate}`; // 중카테고리 url
                    return (
                        <ul className="m_cate antialiased">
                            <li>
                            <a>
                            <div className="m_cate_title font-semibold">- {categoryInfo.mcate}</div> 
                            </a>
                                <ul className="s_cate pl-5">
                                    {
                                        categoryInfo.scate.map((scate)=>{
                                            let scateHref = `${mcateHref}/${scate}`; // 소카테고리 url
                                            return (
                                                <li>
                                                    <Link href={scateHref}>
                                                    <div className="s_cate_title font-extralight">{scate}</div>
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
