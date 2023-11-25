import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import Navbar from "./Navbar";
import { RootState } from "../redux/store";
import { useSelector,useDispatch } from "react-redux";
import {  profileDownloadStart} from "../redux/slices/profileSlice";
import { useState } from "react";
import Downloading from "./Downloading";
import {toast} from "react-toastify"

// import Templates from "./Templates";
const LandingContainer = styled.div`
  display: flex;
  position: relative;
  background-image: url('/landing.jpg');
  background-size: cover;
  height: 85vh;
  z-index: 9999;
  // @media (max-width: 768px) {
  //   height: 60vh;
  // }
`;
const hue = keyframes`
 from {
   -webkit-filter: hue-rotate(0deg);
 }
 to {
   -webkit-filter: hue-rotate(-360deg);
 }
`;
const AnimatedGradientText = styled.h1`
position:absolute;
top:40%;
left:10%;
z-index:9999;
justify-content: center;
text-transform: uppercase;
  color: #f35626;
  background-image: -webkit-linear-gradient(92deg, #000403, #2793DA);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  -webkit-animation: ${hue} 10s infinite linear; // Apply the keyframe animation
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial,
    sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-feature-settings: "kern";
  font-size: 48px;
  font-weight: 700;
  line-height: 48px;
  overflow-wrap: break-word;
  text-align: center;
  text-rendering: optimizelegibility;
  -moz-osx-font-smoothing: grayscale;
`;
const DownloadButton=styled.button`
    position: absolute;
    top:100px;
    right:50%;
    padding:20px;
    color:white;
    font-size:20px;
    border-radius:10px;
    background-color:blue;
`;
// ... (import statements)

const Landing:React.FC = () => {
  const [showLoader, setShowLoader] = useState(false);
  const message = useSelector((state: RootState) => state.profile.message);
  const error1 = useSelector((state: RootState) => state.profile.error);
  const user = useSelector((state: RootState) => state.user.loginUser);
  const dispatch = useDispatch();

  const handleDownload = () => {
    setShowLoader(true); // Show loader when download starts
    dispatch(profileDownloadStart());
    if(message){
      toast(message, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        style: {
          color: 'green', // Red text color
        },
      });
      // navigate('/login');
    }
    else if(error1){
      toast(error1, {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        style: {
          color: 'red', 
          fontSize:"20px"
        },
      });
    }
    // Simulate a delay (e.g., 3000 milliseconds or 3 seconds)
    setTimeout(() => {
      setShowLoader(false); // Hide loader after the delay
    }, 30000);
  };

  return (
    <>
      <LandingContainer>
        {user && (
          <>
            {showLoader ? (
              <Downloading /> // Display preloader during the simulated delay
            ) : (
              <DownloadButton onClick={handleDownload}>
                Download CV
              </DownloadButton>
            )}
          </>
        )}
        <AnimatedGradientText>
          Get An Impressive Resume For Your Job!!
        </AnimatedGradientText>
        <Navbar />
      </LandingContainer>
      {/* Uncomment the following line to render Templates */}
      {/* <Templates /> */}
    </>
  );
};

export default Landing;

