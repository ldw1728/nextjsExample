import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/common/layout'
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {

  let title:String = pageProps.frontmatter ? 
                pageProps.frontmatter.title : Component.name ;
  let {asPath} = useRouter();
  return (
    <Layout page={{title, url:asPath}}>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
