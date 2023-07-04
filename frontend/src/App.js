import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from "./pages/Home/Home.js";
import Register from "./pages/auth/Register.js";
import Forgot from "./pages/auth/Forgot.js";
import Login from "./pages/auth/Login.js";
import Reset from "./pages/auth/Reset.js";
import Layout from "./components/layout/Layout.js";
import Dashboard from "./pages/dashboard/Dashboard.js";
import Sidebar from "./components/sidebar/Sidebar.js";
import axios from "axios";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getLoginStatus } from "./services/authService.js";
import { SET_LOGIN } from "./redux/features/auth/authSlice.js";

axios.defaults.withCredentials=true;

function App() {
  const dispatch=useDispatch();

  useEffect(()=>{
async function LoginStatus(){
const status=await getLoginStatus();
dispatch(SET_LOGIN(status));
}
LoginStatus();
  },[dispatch]);
    return(
      <BrowserRouter>
      <ToastContainer />
    <Routes>
<Route path="/" element={<Home/>} />
<Route path="/login" element={<Login/>} />
<Route path="/register" element={<Register/>} />
<Route path="/forgot" element={<Forgot/>} />
<Route path="/resetpassword:resetToken" element={<Reset/>} />
<Route path="/dashboard" element={
  <Sidebar>
    <Layout>
      <Dashboard/>
    </Layout>
    </Sidebar>
} />

    </Routes>
    </BrowserRouter>
  );
}

export default App;
