import {useSession, signIn, signOut} from "next-auth/react"


export default function LoginPopup({show, setClose}:any){
    console.log(show);
    return (
        <>
        <div className={show ? 'loginPopupContainer block' : 'loginPopupContainer hidden'}>
            <div className="loginPopup">

            
            </div>
        </div>
        </>
    )
}