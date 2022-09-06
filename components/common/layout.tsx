import styles from '/styles/Home.module.css'
import Nav from './nav'
import Head from './Head'
import Header from './Header'
import Footer from './Footer'
import Category from './Caregory'


type LayoutProps = {
    children: JSX.Element,
    page:{
        title : String,
        url: String
    }
}

export default function layout (layoutProps:LayoutProps) {

    const isShowCate = layoutProps.page.url.indexOf('posts') > -1  ? true : false;

    return (<>
        <Head title={layoutProps.page.title}/>
        <div className={styles.container}>
            <Header/>
            
            <main className='flex justify-center content-center pt-5 pb-5'> 
            {isShowCate ? <Category/> : null}
                {layoutProps.children}
            </main> 
            <Footer style = {styles.footer}/>
        </div>
        </>
    );
};