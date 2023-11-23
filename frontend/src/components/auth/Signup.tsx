import { useRef } from "react";
import axios from "axios";

const Signup = ({changeForm}: any) => {
    
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const usernameRef = useRef<HTMLInputElement>(null)

    async function signup(event:any){

        event.preventDefault();
        // try {
        //     let email = emailRef.current?.value;
        //     let username = usernameRef.current?.value;
        //     let password = passwordRef.current?.value;
        //     const result = await axios.post("http://localhost:5000/api/users/register",{email,username,password})
        //     console.log(result)
        //     if(result.status === 201){
        //         changeForm(undefined)
        //     }
            
        // } catch (error) {
        //     console.log(error)
        // }
    }

    return (
        <div className='box'>
            <span className='borderLine2'></span>
            <form onSubmit={signup}>
                <h2>Sign Up</h2>
                <div className='inputBox'>
                    <input type='text' required ref={usernameRef} />
                    <span>Username</span>
                    <i></i>
                </div>
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
                <div className='links'>
                    <a href='#'>Forgot Password</a>
                    <a onClick={changeForm} >Signin</a>
                </div>
                <input type='submit' value={"Signup"} />
            </form>
        </div>
    )
}

export default Signup;

 // <div className='box'>
        //     <span className='borderLine2'></span>
        //     <form>
        //         <h2>Sign Up</h2>
        //         <div className='inputBox'>
        //             <input type='text' required />
        //             <span>Username</span>
        //             <i></i>
        //         </div>
        //         <div className='inputBox'>
        //             <input type='text' required />
        //             <span>Email</span>
        //             <i></i>
        //         </div>
        //         <div className='inputBox'>
        //             <input type='password' required />
        //             <span>Password</span>
        //             <i></i>
        //         </div>
        //         <div className='links'>
        //             <a href='#'>Forgot Password</a>
        //             <a onClick={changeForm} >Signin</a>
        //         </div>
        //         <input type='submit' value={"Signup"} />
        //     </form>
        // </div>