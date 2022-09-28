import LoginPopup from '../auth/LoginPopup'

//공통으로 사용되는 팝업레이어

//해당 함수로 실질적인 팝업의 기능을 결정하여 component를 리턴
function getPopupComponent(cmd:string){
    switch(cmd){
        case 'signin' : return <LoginPopup></LoginPopup>
        case 'profile' : return ''
        
    }
}

export default function PopupLayer({popupSetting}:any){

    const {isPopup, cmd, closePopup} = popupSetting;

    return (

            <div className={isPopup ? 'popupContainer block' : 'popupContainer hidden'}>
                <div className="popupLayer">
                    <div className="absolute cancel w-full justify-end">
                        <img className="float-right w-14 h-14 p-2 cursor-pointer opacity-30 hover:opacity-60" src="icon/cancel_icon.png" onClick={closePopup}></img>
                    </div>
                {
                    getPopupComponent(cmd)
                }
                </div>
            </div>
        
    )
}