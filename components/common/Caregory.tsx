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
                    return (
                        <ul className="m_cate antialiased">
                            <li>
                            <div className="m_cate_title font-semibold">- {categoryInfo.mcate}</div>
                                <ul className="s_cate pl-5">
                                    {
                                        categoryInfo.scate.map((scate)=>{
                                            return (
                                                <li>
                                                    <Link href='/posts?params=123'>
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
