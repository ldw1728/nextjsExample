import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import {chkSign} from '../../lib/AuthService'


const ToastEditor = dynamic(
    ()=> import('../../components/post/ToastEditor'),{ssr:false}
)


export default function Edit( ){
    const router = useRouter();
    const {mode} = router.query;

    return (
        <>
            <ToastEditor/>
        </>
    )
}

export async function getServerSideProps({req}: any) {
    const session = await getSession({req});
    console.log()
    chkSign(session, req.url);    
    if(!session){
        return {
            redirect: {
            permanent: false,
            destination: "/"
          }
        }
    }

    return {
        props:{}
    };
       
  }