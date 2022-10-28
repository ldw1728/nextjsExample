import { getSession } from "next-auth/react";
import { AppProps } from "next/app";
import { chkSign } from "../../lib/AuthService";

export default function about(){
    
    return (
        <div> 
            this is basic about
        </div>
    )
}


export async function getServerSideProps({req, query}: any) {

    
    var result = chkSign({req});

    console.log(result)
    return result;
       
  }