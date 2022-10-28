import { getAllPosts, getCategoryList, getAllCategoryPaths, getPost } from '../../lib/post';
import Category from '../../components/common/Caregory'
import {useRouter}  from 'next/router'
import PostList from '../../components/post/PostList'
import PostDetail from '../../components/post/PostDetail'

type PostsProps ={
    posts: Array<any>,
    categoryList: Array<any>,
    postDetail: any,
    pageIdx: Number,

}

export default function Posts(postProps: PostsProps){
    const router = useRouter()
    const queryArr:any = router.query.tag;

    /*
    요청받은 경로에 따라 post상세/post리스트 화면을 구분하여 보여줌.
    [ex] http://url/post/{category}/{tag}/post/{postFileName}}
    쿼리스트링 순서에 맞게 array 형식으로 최대 4개까지 들어온다.
    queryArr의 length가 4일 경우 post상세페이지를 보여줌. 4보다 작을 시 post리스트
    */

    return <>
            <Category categoryList={postProps.categoryList}/>
            {
                (queryArr && queryArr.length > 3) ? //쿼리스트링이 존재하고 길이가 3이상.
                               <PostDetail props={postProps.postDetail}/>:<PostList posts={postProps.posts} pageIdx={postProps.pageIdx} queryArr={queryArr} />
            }
            </>
}   
  /*
          {params:{tag: [dev, javascript]}}
          요런 형식으로 path를 구성하여 nextjs getStaticPaths에 넘겨주어 경로를 미리 세팅하면
          추후에 쿼리스트링으로 받아오는 tag: [dev, javascript] 와 매칭하여 getStaticProps로 넘겨줌
          getStaticProps에서 tag: [dev, javascript] 경로에 대한 실질적인 데이터처리
          
        */
// 해당 메소드는 동적라우팅을 이용할 때 꼭 정의 해야함. 정적으로 경로를 미리 세팅하여 매핑하기 위해.
//paths에는 세팅된 경로가 저장되어있어 return하여 넘겨줌
//build 시 한번 실행되며 dev에서는 계속 실행된다.
export async function getStaticPaths(){
    const paths = await getAllCategoryPaths();
    // paths.map((e)=>{
    //     console.log(e);
    // })

    return {
        paths,
        fallback: 'blocking',
      };
      /*
        fallback:false -> 설정된 경로가 아닐 시 404페이지.
        fallback:true -> 설정된 경로가 아니어도 페이지 render
        fallback:''blocking -> 설정된 경로가 아니면 blocking 하여 getStaticProps wait 후 페이지 render
      */
}

export async function getStaticProps({params:{tag}}: any){
   
    let postsProps:PostsProps = {
        posts: [], 
        categoryList: [],
        postDetail: null,
        pageIdx: 1,

    };
    
    // post상세
    if(tag && tag.length > 3){ //[ex] http://url/post/{category}/{tag}/post/{postFileName}}
        postsProps.postDetail = JSON.parse(JSON.stringify(await getPost(tag[3])));       
    }
    else {// post list
        let posts_tmp = await getAllPosts(tag);
        postsProps.posts = JSON.parse(JSON.stringify(posts_tmp));
        if(tag){
            if(tag.length == 1){    //[ex] http://url/post/{idx}
                postsProps.pageIdx = tag[0];
            }
            else if(tag.length === 3){  //[ex] http://url/post/{category}/{tag}/{idx}
                postsProps.pageIdx = tag[2];
            }
            
        }
    }
    postsProps.categoryList = await getCategoryList();

    return { 
        props : postsProps
    }
}


// // getStaticProps에서는 url의 slug(파일명)에맞는 파일의 데이터를 가져와 리턴.
// export async function getStaticProps({params:{slug}}: any){
//     const res = await getPost(slug);
//     const resJson = JSON.parse(JSON.stringify(res));
//     const categoryList = getCategoryList();
//     return {
//         props: {frontmatter:resJson.frontmatter, content:resJson.content, categoryList:categoryList}
//     }
// }