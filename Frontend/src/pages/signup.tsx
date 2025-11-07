
import SignUpInput from "../component/signupinput"

export default function SignUp(){
    return (
     <div className="bg-gray-100 flex justify-center items-center h-screen">
          <div className="bg-white rounded-md shadow-lg text-center h-[70vh] w-[50vh]">
            <h1 className="py-10 text-slate-600 text-2xl font-bold">Sign Up</h1>
            <SignUpInput/>
          </div>
     </div>
    )
}