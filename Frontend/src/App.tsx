import { Routes,Route } from "react-router-dom"
import Home from "./pages/home"
import Signup from "./pages/signup"
import Signin from "./pages/singin"
import Channels from "./pages/channels"
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react"

function App() {
  return (
   <div className="min-h-screen">
     <Routes>
      <Route path={"/"} element={<Home/>}/>
      <Route path={"/signup"} element={<Signup/>}/>
      <Route path={"/signin"} element={<Signin/>}/>
      <Route path={"/channels"} element={<Channels/>}></Route>
      <Route path={"/sso-callback"} element={<AuthenticateWithRedirectCallback/> }></Route>
     </Routes>
   </div>
  )
}

export default App
