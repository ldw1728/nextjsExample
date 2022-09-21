

export interface Pagination  {
    tot_pages :   Number,
    curr_page :   Number,
    max_contentsCnt : Number,
    pre_cate : String
  }

export function setPagination(posts:any[]){
    const cate = posts[0].frontmatter.tag;
}
