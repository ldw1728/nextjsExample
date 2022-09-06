
type propsData = {
    style : string
}

export default function Footer(propsData:propsData){
    return (
        <footer className = {propsData.style}>
            footer Component.           
        </footer>
    )
}