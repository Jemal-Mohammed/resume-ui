// Import necessary libraries and components
import styled from '@emotion/styled';
import Navbar from './Navbar';
import { FormEvent, useState } from 'react';
import {  useDispatch, useSelector } from 'react-redux'
import {  registerStart } from '../redux/slices/userSlice';
import { RootState } from '../redux/store';
import {toast } from "react-toastify"
import { useNavigate } from 'react-router-dom';
// Styled components for styling
const RegisterContainer = styled.div`
  background-color: #fff;
  position: relative;
  display: flex;
  margin: auto; /* Center horizontally */
  background-color: #e0e4ea;
  align-items: center; /* Center vertically */
  justify-content: center; /* Center horizontally */
  height: 100vh; /* Set the height of RegisterContainer to 100% of the viewport height */
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  border-radius: 30px;
  background-color: #fff;
  align-items: center; /* Center vertically */
  justify-content: center; /* Center horizontally */
  padding: 70px; /* Add padding for better aesthetics */
  
  label {
    align-items: start; /* Center vertically */
    margin-bottom: 10px; /* Add spacing between labels and inputs */
  }
  
  input {
    width: 100%;
    padding: 10px 40px 10px 10px; /* Adjust padding for the icon */
    border: 1px #22A7BF solid;
    margin-bottom: 10px; /* Add spacing between inputs */
    position: relative;
    border-radius: 10px;
  }

  input::before {
    content: '🔒'; /* You can replace this with your preferred icon */
    position: absolute;
    left: 10px; /* Adjust the left position of the icon */
    top: 50%; /* Center the icon vertically */
    transform: translateY(-50%);
    font-size: 18px; /* Adjust the icon size */
    color: #22A7BF; /* Set the icon color */
  }

  .email-icon::before {
    content: '✉️'; /* You can replace this with your preferred email icon */
    position: absolute;
    left: 10px; /* Adjust the left position of the icon */
    top: 50%; /* Center the icon vertically */
    transform: translateY(-50%);
    font-size: 18px; /* Adjust the icon size */
    color: #22A7BF; /* Set the icon color */
  }

  .user-icon::before {
    content: '👤'; /* You can replace this with your preferred user icon */
    position: absolute;
    left: 10px; /* Adjust the left position of the icon */
    top: 50%; /* Center the icon vertically */
    transform: translateY(-50%);
    font-size: 18px; /* Adjust the icon size */
    color: #22A7BF; /* Set the icon color */
  }

  button {
    background-color: #22A7BF;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    font-size: 16px;
  }
`;
const Title = styled.h2`
color:#22ADBF;
padding:30px;
`;

const ErrorMessage=styled.p`
color:red;
`;
// Register component
// ... (other imports)
 
// Register component
export const Register:React.FC = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  // const [isValidEmail, setIsValidEmail] = useState(true);
  const [user, setUser] = useState({ name: '', email: '', password: '' });
  const [error,setError]=useState({nameError:'',emailError:'',passwordError:''});
  const error1=useSelector((state:RootState)=>state.user.error)
  const message=useSelector((state:RootState)=>state.user.message)
   
   const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!user.name.trim()) {
      setError({ ...error, nameError: "*The name field is iequired" });
      return; // Stop further execution if there is an error
    }
    // Clear the error if the name is not empty
    setError({ ...error, nameError: '' });
    if (!user.email.trim()) {
      setError({ ...error, emailError: "The email field is required" });
      return; // Stop further execution if there is an error
    }
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if(emailRegex.test(user.email)){
    //   setError({ ...error, emailError: "This field Must be email" });
    //   return; 
    // }
    // Clear the error if the email is not empty

    setError({ ...error, emailError: '' });
    if (!user.password.trim()) {
      setError({ ...error, passwordError: "The password field is required" });
      return; // Stop further execution if there is an error
    }
    // Clear the error if the name is not empty
    setError({ ...error, passwordError: '' });

    // Dispatch the registration action
    dispatch(registerStart(user));
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
      navigate('/login');
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
  };

  return (
    <RegisterContainer>
      <Navbar />
      <FormContainer>
        <Title>REGISTER</Title>
        <form onSubmit={handleSubmit}>
          <label htmlFor="Name">Name</label>
          <input
            type="text"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            placeholder="👤 Enter your name"
            className="user-icon"
          />
          {error.nameError && <ErrorMessage >{error.nameError}</ErrorMessage>}
          <label htmlFor="Email">Email</label>
          <input
            type="text"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="✉️ Enter your email"
            className="email-icon"
          />
          {error.emailError && <ErrorMessage >{error.emailError}</ErrorMessage>}

          <label htmlFor="Password">Password</label>
          <input
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            type="password"
            placeholder="🔒 Enter your password"
          />
          {error.passwordError && <ErrorMessage >{error.passwordError}</ErrorMessage>}
          <button type="submit">Register</button>
        </form>
      </FormContainer>
    </RegisterContainer>
  );
};

