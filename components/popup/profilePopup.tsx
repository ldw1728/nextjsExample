
export default function ProfilePopup({session}:any){
    const {name, email, image} = session.user;

    return (
      <>
            <table className=" font-semibold table-auto relative h-96 w-full bg-slate-200 text-center mx-auto rounded-xl">
                <tbody className="">
                    <tr>
                        <td className=" "><img className="h-40 w-40 rounded-full border-2 border-black mx-auto" src={image} alt="" /></td>
                    </tr>
                    <tr >
                        <td className="py-2 antialiased">{name}</td>
                    </tr>
                    <tr>
                        <td className="py-2 antialiased">{email}</td>
                    </tr>
                    <tr>
                        <td></td>
                    </tr>
                </tbody>
            </table>
            </>
    )
}