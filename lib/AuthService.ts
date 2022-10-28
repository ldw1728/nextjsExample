import { NextApiRequest } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";

export async function chkSign(req:NextApiRequest, query:string){
   let requiredAuthList:any = process.env.RQRD_SIGNIN;
   let rtnObj:any = {
         props:{},
      }

      if(requiredAuthList){
      
      if(requiredAuthList?.indexOf(query) > -1){
         
         let session =  await getUserSession({req});

            if(session){
               session = JSON.parse(session);
               rtnObj = {
                  props:{session},
               }
            }
            else {
               rtnObj = {
                  redirect:{
                     destination: '/',
                     permanent: false,
                  }
               }
            }
         }    
   }
   //console.log(req)
   //console.log(rtnObj)
   return rtnObj;
}


 async function getUserSession({req}:any){
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