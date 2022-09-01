import { useRouter } from "next/router";

export default function about(){
    const router = useRouter(); //nextjs 라우터사용
    const id : String = router.query.id as String; // ts방식으로 타입을 결정 및 타입변환.
    const comment : String = router.query.comment as String;

    return (
        <div>
            about : {id} : {comment}
        </div>
    )
}