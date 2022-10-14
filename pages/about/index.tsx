import { getSession } from "next-auth/react";
import { AppProps } from "next/app";

export default function about(){
    
    return (
        <div> 
            this is basic about
        </div>
    )
}


export async function getServerSideProps({req}: any) {
    const res = await fetch(`${process.env.HOST_URL}/api/auth/chkSign`, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        cookie: req.headers.cookie!,
        },
    }).then((res)=> {
        return res.json().then((data)=>{return data})
    });
    
    return {
        props:{res}
    };
       
  }