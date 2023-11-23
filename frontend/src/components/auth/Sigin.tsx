import { useEffect, useRef } from "react";
import { useCalendar } from "../../store/zustandStore";
import { api } from "../../axios/interceptors";


const Signin = ({ changeForm }: any) => {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const setLogin = useCalendar((state: any) => state?.setLogin)

    const login = async (e:any) => {
        e.preventDefault()
        if (emailRef.current && passwordRef.current) {
            try {
                const res = await api.post("http://localhost:3000/api/users/login", { email: emailRef.current?.value, password: passwordRef.current?.value,username:"admin" });
                console.log(res.data)
                if(res.data.success){
                    localStorage.setItem("jwt-auth-token",res.data.accessToken);
                    setLogin(true);
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    // async function login(event:any){
    //     event.preventDefault();
    //     try {
    //         const result =  await axios.post("http://localhost:5000/api/users/auth",{email:emailRef.current?.value,password:passwordRef.current?.value},{
    //             withCredentials:true
    //         });

    //         console.log(result.data)

    //         localStorage.setItem("auth-token",result?.data?.accessToken)
    //         setLogin(true)

    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    // useEffect(()=>{

    //     async function getSample(){
    //         try {
    //             const result = await axios.post("http://localhost:5000/api/users/refresh",{email:"bhokal"},{
    //                 withCredentials:true
    //             })
    //             console.log(result)

    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }

    //     getSample()

    // },[])

    useEffect(() => {
        if (emailRef.current && passwordRef.current) {
            emailRef.current.value = "admin@admin.com";
            passwordRef.current.value = "Admin@123"
        }
    }, [])

    return (
        <div className='box'>
            <span className='borderLine2'></span>
            <form onSubmit={login}>
                <h2>Sign In</h2>
                <div className='inputBox'>
                    <input type='text' required ref={emailRef} />
                    <span>Email</span>
                    <i></i>
                </div>
                <div className='inputBox'>
                    <input type='password' required ref={passwordRef} />
                    <span>Password</span>
                    <i></i>
                </div>
                {/* <div className='links'>
                    <a href='#'>Forgot Password</a>
                    <a onClick={changeForm} >Signup</a>
                </div> */}
                <input type='submit' value={"Login"} />
            </form>
        </div>
    )
}

export default Signin;