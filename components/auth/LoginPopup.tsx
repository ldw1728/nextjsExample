import {useSession, signIn, signOut} from "next-auth/react"


export default function LoginPopup({show}:any){

    return (
        <>
        <div className={show ? 'loginPopupContainer block' : 'loginPopupContainer hidden'}>
            <div className="loginPopupLayer">

            </div>
        </div>
        </>
    )
}