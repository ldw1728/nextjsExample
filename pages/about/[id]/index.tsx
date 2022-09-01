import { useRouter } from "next/router";



export default function about(){
    const router = useRouter();
    const id : String = router.query.id as String;

    return (
        <div>
            about : {id}
        </div>
    );
};