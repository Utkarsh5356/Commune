import { Routes,Route } from "react-router-dom"
import Home from "./pages/home"
import Signup from "./pages/signup"
import Signin from "./pages/singin"

function App() {
  return (
    <div className="min-h-screen">
    
         <Routes>
            <Route path={"/"} element={<Home/>}/>
            <Route path={"/signup"} element={<Signup/>}/>
            <Route path={"/signin"} element={<Signin/>}/>
         </Routes>

    </div>
  )
}

export default App
