import styles from '/styles/Home.module.css'
import Nav from './nav'
import Head from './Head'
import Header from './Header'


type LayoutProps = {
    children: JSX.Element,
    page:{
        title : String,
        url: String
    }
}

export default function layout (layoutProps:LayoutProps) {
    return (<>
        <Head title={layoutProps.page.title}/>
        <div className={styles.container}>
            <Header/>
            <main className='flex justify-center content-center pt-5 pb-5'> 
                {layoutProps.children}
            </main>
            <footer className={styles.footer}>
                footer Component.
            </footer>
        </div>
        </>
    );
};