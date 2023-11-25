import  { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./components/Landing";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import Footer from "./components/Footer";
import { Profile_Complate } from "./components/Profile_Complate";
// import axios from "axios";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import { fetchStart } from "./redux/slices/userSlice";
import Preloader from "./components/Preloader";
import { RootState } from "./redux/store";
import ProtectedPage from "./protectedPage/ProtectedPage";

// axios.defaults.withCredentials = true;

function App() {
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.user.loading);
  const [appLoaded, setAppLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchStart());
    };
  
    fetchData().then(() => {
      // Introduce a delay of 1000 milliseconds (1 second) before setting appLoaded to true
      setTimeout(() => {
        setAppLoaded(true);
      }, 1000);
    });
  }, [dispatch]);
  

  return (
    <>
      <ToastContainer />
      {loading && !appLoaded && <Preloader />}
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedPage />}>
          <Route path="/build_your_resume" element={<Profile_Complate />} />
          </Route>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> 
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
