import {BrowserRouter, Route, Routes} from "react-router-dom"
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import Reset from "./pages/Auth/Reset";
import Forgot from "./pages/Auth/Forgot";
import Register from "./pages/Auth/Register";
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/login" element={<Login />}/>
      <Route path="/resetpassword:resetToken" element={<Reset />}/>
      <Route path="/forgot" element={<Forgot />}/>
      <Route path="/register" element={<Register />}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
