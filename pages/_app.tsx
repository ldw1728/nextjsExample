import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/common/layout'
import { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react";
import { useEffect } from 'react';
import { chkSign } from '../lib/AuthService';

function MyApp({ Component, pageProps:{session, ...pageProps} }: AppProps) {
  let title:String = pageProps.frontmatter ? 
                pageProps.frontmatter.title : Component.name ;
  let {asPath} = useRouter();

  return (
    <SessionProvider session={session}>
      <Layout page={{title, url:asPath}} >
        <Component {...pageProps}/>
      </Layout>
    </SessionProvider>    
  )
}

export async function getServerSideProps(context: any) {

  const {req,resolvedUrl} = context;
  var result = await chkSign(req,resolvedUrl);
console.log(resolvedUrl)
  return result;
     
}

export default MyApp
