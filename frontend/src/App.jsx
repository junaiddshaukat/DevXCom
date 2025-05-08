import{BrowserRouter,Routes,Route} from 'react-router-dom'
import {LoginPage,SignupPage,ActivationPage} from "./Routes.js"

const App = () => {
  return (
   <BrowserRouter>
    <Routes>
      <Route path='/login'  element={<LoginPage/>}/>
      <Route path='/signup'  element={<SignupPage/>}/>
      <Route path='/activation/:activationToken'  element={<ActivationPage/>}/>
    </Routes>
   </BrowserRouter>
  )
}
export default App