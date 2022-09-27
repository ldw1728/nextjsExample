import {useSession, signIn, signOut} from "next-auth/react"


export default function LoginPopup({show}:any){

    return (
        <>
        <div className={show ? 'LoginPopup block' : 'LoginPopup hidden'}>

        </div>
        </>
    )
}