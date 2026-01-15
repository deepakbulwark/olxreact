import Home from "./Pages/Home"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SignupPage from './Pages/Signup'
import { FirebaseContext,AuthContext } from "./store/Context.jsx"
import { useContext, useEffect } from "react"
import { onAuthStateChanged } from "firebase/auth"
import LoginPage from "./Pages/Login"
import CreatePage from "./Pages/Create.jsx"
import ViewPost from "./Pages/ViewPost.jsx"
import Post from "./store/PostContext.jsx"


function App() {
const {user,setUser}=useContext(AuthContext)
const {auth}=useContext(FirebaseContext)
useEffect(()=>{
const authState= onAuthStateChanged(auth,(user)=>{
  setUser(user)
})
return authState;
},[auth,setUser])
  return <>
  <Post>

        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/signup" element={<SignupPage />} />
            <Route exact path="/login" element={<LoginPage />} />
            <Route exact path="/create" element={<CreatePage />} />
            <Route exact path="/view" element={< ViewPost/>} />
          </Routes>
        </Router>
  </Post>
  </>
}

export default App
