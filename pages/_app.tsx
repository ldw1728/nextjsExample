import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/common/layout'
import { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react";


function MyApp({ Component, pageProps:{session, ...pageProps} }: AppProps) {

  let title:String = pageProps.frontmatter ? 
                pageProps.frontmatter.title : Component.name ;
  let {asPath} = useRouter();
  return (
    <SessionProvider session={session}>
      <Layout page={{title, url:asPath}}>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>    
  )
}

export default MyApp
