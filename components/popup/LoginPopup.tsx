import {signIn} from "next-auth/react"


//로그인 팝업.
export default function LoginPopup(){

    return (           
                <>
                <div className="title w-full text-center py-8">sign in with</div>
                <div className="w-full h-4/5">
                    <table className="table-auto w-64  mx-auto text-center border-collapse text-slate-500 my-3">
                        <tbody>
                            <tr className="hover:bg-slate-200">
                                <td className="border-2 border-slate-200 p-2  cursor-pointer " onClick={()=>signIn('github')}>
                                    <img className="w-15 h-10 inline p-1" src="icon/github.png"></img>
                                    <img className="w-15 h-10 inline p-1" src="icon/GitHub_Logo.png"></img>
                                </td>
                            </tr>
                            <tr className="hover:bg-slate-200">
                                <td className="border-2 border-slate-200 p-2  cursor-pointer" onClick={()=>signIn('naver')}>
                                    <img className="w-13 h-10 inline scale-50 " src="icon/naver_logo.png"></img>                                    
                                </td>
                            </tr>
                            <tr className="hover:bg-slate-200">
                                <td className="border-2 border-slate-200 p-2  cursor-pointer " onClick={()=>signIn('google')}>
                                    <img className="w-15 h-10 inline p-1" src="icon/google_logo.png"></img>                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                </>
    )
}