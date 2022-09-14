import dateFormat from 'date-and-time';
import mdIt from 'markdown-it';


export default function PostDetail({frontmatter, content, categoryList} : any){

    const {title, author, date} = frontmatter;
    const md = new mdIt();
    const mdContent :string = md.render(content);

    return (
        <article className="prose lg:prose-xl prose-slate"> 
                <div className='post_Info py-10'>
                <div className='antialiased text-3xl py-5'>{title}</div>
                <div className='date antialiased italic font-thin text-sm float-right'>{dateFormat.format(new Date(date), 'YYYY/MM/DD HH:mm')}</div>
                </div>  
                <div className='antialiased' dangerouslySetInnerHTML={{__html:mdContent}}/>
                        
            </article>
    )
}