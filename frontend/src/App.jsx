import{BrowserRouter,Routes,Route} from 'react-router-dom'
import {LoginPage,SignupPage,ActivationPage} from "./Routes.js"
import { ToastContainer } from 'react-toastify'

const App = () => {
  return (
   <BrowserRouter>
    <Routes>
      <Route path='/login'  element={<LoginPage/>}/>
      <Route path='/signup'  element={<SignupPage/>}/>
      <Route path='/activation/:activationToken'  element={<ActivationPage/>}/>
    </Routes>
    <ToastContainer position="top-right" autoClose={3000} />
   </BrowserRouter>
  )
}
export default App