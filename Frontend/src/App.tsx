import { BrowserRouter,Routes,Route } from "react-router-dom"
import Home from "./pages/home"
import SignUp from "./pages/signup"
import SignIn from "./pages/singin"

function App() {
  return (
    <div className="min-h-screen">
       <BrowserRouter>
         <Routes>
            <Route path={"/"} element={<Home/>}/>
            <Route path={"/signup"} element={<SignUp/>}/>
            <Route path={"/signin"} element={<SignIn/>}/>
         </Routes>
       </BrowserRouter>
    </div>
  )
}

export default App
