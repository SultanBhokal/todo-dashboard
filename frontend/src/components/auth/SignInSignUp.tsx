import React from 'react';
import Signin from './Sigin';
import Signup from './Signup';



export default function () {
    const [currentForm, setCurrentForm] = React.useState<String>("signin")
    const [animate,setAnimate]= React.useState<Boolean>(false)
    function changeForm(event: React.MouseEvent<HTMLAnchorElement> | any) {
        event?.preventDefault()
        setAnimate(true)
        setTimeout(()=>{
            if (currentForm === "signin") {
                setCurrentForm("signup")
            }
            else {
                setCurrentForm("signin")
            }
            setAnimate(false)
        },500)
    }



    return (
        <div className={animate ? "form-fade-entering":"form-fade-entered"}>
            {
                currentForm === "signin" ?
                    <Signin changeForm={changeForm} />
                    :
                    <Signup changeForm={changeForm} />
            }
        </div>
    )
}
