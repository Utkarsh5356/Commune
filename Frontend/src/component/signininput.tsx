import { useState,useEffect } from "react"
import { Link,useNavigate } from "react-router-dom"
import { signInWithEmailAndPassword,signInWithPopup } from "firebase/auth"
import { auth,google } from "../firebaseConfig"

export default function SignInInput(){
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [userData,setUserData]=useState({})
    const navigate=useNavigate()

    const signIn=async ()=>{
      try{
       const userCredentials=await signInWithEmailAndPassword(auth,email,password)
       setUserData(userCredentials.user)
       console.log(userCredentials.user)
       navigate("/")
      }catch(err){
       console.log(err)
      }
    }

    const googleSignIn=async ()=>{
     try{
      const userCredentials=await signInWithPopup(auth,google)
      setUserData(userCredentials.user)
      console.log(userCredentials.user)
      navigate("/")
     }catch(err){
      console.log(err)
     } 
    }
    
    useEffect(()=>{
     async function getToken(){
      const token=await auth.currentUser?.getIdToken()
      console.log(token)
     }
     getToken()
    },[userData])
    return (
        <div className="py-2">
            <div className="py-2 px-10">
              <input className="flex w-full py-1 px-2 font-light placeholder:font-normal  rounded-md border-[0.5px] border-black  outline-blue-300  "
              type="text"
              value={email}
              placeholder={"Email"}
              onChange={(e)=>setEmail(e.target.value)} 
             />
            </div>
            <div className="py-2 px-10">
             <input className="flex w-full py-1 px-2 font-normal rounded-md border-[0.5px] border-black  outline-blue-300  "
              type="password"
              value={password}
              placeholder={"Password"}
              onChange={(e)=>setPassword(e.target.value)} 
             />
            </div>
            <div className="pt-5">
              <button onClick={signIn} className="group relative inline-flex h-10 cursor-pointer border bg-slate-600 items-center justify-center overflow-hidden rounded-md  px-33 font-semibold text-white text-sm transition hover:scale-110"><span>Sign In</span><div className="absolute inset-0 flex h-full w-full justify-center transform-[skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:transform-[skew(-12deg)_translateX(100%)]"><div className="relative h-full w-8"></div></div></button>
           </div>
            <div className="py-2 text-[13px] text-slate-600 font-normal">
              Don't have an account? <span><Link className="text-blue-400 font-normal" to="/signup">Sign Up</Link></span>
            </div>
            <div className="py-7 px-11 flex items-center text-xs text-gray-400 uppercase before:flex-1 before:border-t before:border-gray-300 before:me-3 after:flex-1 after:border-t after:border-gray-300 after:ms-3 dark:text-neutral-600 ">
              Or
            </div>
            <div> 
               <button onClick={googleSignIn} className="group relative inline-flex gap-3 h-10 cursor-pointer border border-slate-400 items-center justify-center overflow-hidden rounded-md  px-18 font-semibold text-black text-sm transition hover:scale-110">
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="100" viewBox="0 0 48 48">
                    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                 </svg>
                </span><span>Sign In with Google</span><div className="absolute inset-0 flex h-full w-full justify-center transform-[skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:transform-[skew(-12deg)_translateX(100%)]"><div className="relative h-full w-8"></div></div>
               </button>
             </div>
        </div>  
    )
}