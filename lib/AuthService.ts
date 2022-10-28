import { Session } from "next-auth";
import { getSession } from "next-auth/react";

export async function chkSign({req}:any){
   let requiredAuthList:any = process.env.RQRD_SIGNIN;
   let rtnObj:any = {
      redirect:{
         destination: '/',
         permanent: false,
      }
   }
   if(requiredAuthList && requiredAuthList?.indexOf(req.url) > -1){
         let session =  await getUserSession({req});
         if(session){
            session = JSON.parse(session);
            rtnObj = {
               props:{session},
            }
         }
         
   }
   console.log(req)
   console.log(rtnObj)
   return rtnObj;
}


export async function getUserSession({req}:any){
   var session = null;
   try{
      session = await fetch(`${process.env.HOST_URL}/api/auth/chkSign`, {
          method: 'GET',
          headers: {
          'Accept': 'application/json',
          cookie: req.headers.cookie!,
          },
      }).then((res)=> {
          return res.json().then((data)=>{return data})
      });
  }catch(err){
      console.log(err)
  }finally{
      return session;
  }
}