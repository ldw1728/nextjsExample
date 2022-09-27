import {useSession, signIn, signOut} from "next-auth/react"


export default function LoginPopup({show}:any){


    return (
        <>
        {
            show ? <div className="LoginPopup">

            </div>: ''
        }
        
        </>
    )
}