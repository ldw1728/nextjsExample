


export default function Category(){
    const s_cate = ['javascript', 'nextJS'];
    return (
        <>
        <div className="category">
            <ul className="m_cate">
                <li>
                    <div className="m_cate">dev</div>
                    <ul className="s_cate">
                        {
                            s_cate.map((scate)=>{
                                return (
                                    <li>
                                        {scate}
                                    </li>
                                );
                            })
                        }
                    </ul>
                </li>
                <li>infomation</li>
                <li>tip</li>
                <li>etc</li>
            </ul>
        </div>
        </>
    )
}