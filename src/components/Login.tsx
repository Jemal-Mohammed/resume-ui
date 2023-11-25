import  {FormEvent, useState} from 'react';
import styled from '@emotion/styled';
import Navbar from './Navbar';
import { loginStart } from '../redux/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const LoginContainer = styled.div`
  background-color: #fff;
  position: relative;
  display: flex;
  margin: auto; /* Center horizontally */
  background-color: #e0e4ea;
  align-items: center; /* Center vertically */
  justify-content: center; /* Center horizontally */
  height: 100vh; /* Set the height of LoginContainer to 100% of the viewport height */
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  border-radius: 30px;
  background-color: #fff;
  align-items: center; /* Center vertically */
  justify-content: center; /* Center horizontally */
  padding: 100px; /* Add padding for better aesthetics */
  
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
const Title=styled.h2`
color:#22ADBF;
padding:30px;
`;
 
const ErrorMessage=styled.p`
color:red;
`;
export const Login:React.FC = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  // const [isValidEmail, setIsValidEmail] = useState(true);
  const [user, setUser] = useState({ email: '', password: '' });
  const [error,setError]=useState({ emailError:'',passwordError:''});
  const message=useSelector((state:RootState)=>state.user.message);
  const logenUser=useSelector((state:RootState)=>state.user);
  const error1=useSelector((state:RootState)=>state.user.error);

  // console.log(message);
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Check if the name field is empty
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
    dispatch(loginStart(user));
if(logenUser){
  toast(message, {
    position: 'bottom-left',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
    style: {
      zIndex:999999999,
      color: 'green', // Red text color
    },
  });
  
  navigate('/');
  // navigate('/build_your_resume');

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
      color: 'red', // Red text color
    },
  });
}
  };

  return (
    <LoginContainer>
       <Navbar />
      <FormContainer>
        <Title>LOGIN</Title>
        <form onSubmit={handleSubmit}>

        <label htmlFor="Email">Email</label>
          <input
            type="text"
            
            placeholder="✉️ Enter your email"
            className="email-icon"value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
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
        <button type="submit">login</button>
        </form>
      </FormContainer>
    </LoginContainer>
  );
};
