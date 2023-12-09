import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Accueil from "../pages/Accueil/Accueil";
import Login from "../pages/Login/Login";
import Footer from "../components/Footer/Footer"
import Profile from "../pages/Profile/Profile";
import Error404 from "../pages/Error404/Error";
 
function App() {
 return (
  <BrowserRouter>
      <Routes>
          <Route path="/" element={<Accueil />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element= {<Profile />} />
          <Route path="*" element={<Error404 />} />
      </Routes>
      <Footer />
</BrowserRouter>
 );
}

export default App;