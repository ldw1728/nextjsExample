import { Session } from "next-auth";

export function chkSign(session:any, path:string){
   console.log(process.env.RQRD_SIGNIN);
   console.log(session);
   console.log(path);
}