import Navbar from "./components/navbar";
import {Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import SettingPage from "./pages/SettingPage";

function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/signup" element={<SignUpPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/settings" element={<SettingPage/>}/>
          <Route path="/profile" element={<ProfilePage/>}/>
      </Routes>
      {/* 1 35 48 */}
    </div>
  );
}

export default App;
