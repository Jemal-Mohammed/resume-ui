import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStart, logoutStart } from '../redux/slices/userSlice';
import { RootState } from '../redux/store';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const ButtonContainer = styled.div`
  position: fixed;
  display: flex;
  padding: 10px;
  width: 100%;
  background-color: #414670;
  top: 0;
  left: 0;
  right: 0;
  justify-content: end;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
z-index:99999;
  @media (max-width: 768px) {
    padding: 5px;
  }
`;
const LogoutButton = styled.button`
padding: 10px;
  text-decoration:none;
  font-size:20px;
  color: white;
  background-color: green;
  border-radius: 5px;
  margin-right: 20px; /* Adjust as needed */
  cursor: pointer; /* Add cursor pointer for better user interaction */
  @media (max-width: 768px) {
    font-size:15px;
  }
`;
const BuildButton = styled(Link)`
  padding: 10px;
  text-decoration:none;
  font-size:20px;
  color: white;
  background-color: green;
  border-radius: 5px;
  margin-right: 20px; /* Adjust as needed */
  cursor: pointer; /* Add cursor pointer for better user interaction */
  @media (max-width: 768px) {
    font-size:15px;
  }
`;
const Navbar = () => {
  const dispatch = useDispatch();
  const message = useSelector((state: RootState) => state.user.message);
  // const error = useSelector((state: RootState) => state.user.error);
  const user = useSelector((state: RootState) => state.user.loginUser);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchStart())
      //  console.log(user);
    };

    fetchData();
  }, [dispatch]);
  const logout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want  to logut!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, loged Out it!',
      customClass: {
        container: 'custom-container-class',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // Swal.fire(
        //   'loged Out!',
        //   'Your have loged Out successfully.',
        //   'success'
        // )
        dispatch(logoutStart())
        if (message) {
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
              zIndex:999999,
              color: 'green', // Red text color
            },
          });
          dispatch(fetchStart())

          navigate('/');
        }
        
      }
    })

  }
  return (
    <ButtonContainer>
      <BuildButton to="/">Home</BuildButton>
      {user &&

        <BuildButton to="/build_your_resume">Build Your Resume</BuildButton>
      }
      {!user &&

        <BuildButton to="/login">Login</BuildButton>
      }
      {!user &&
        <BuildButton to="/register">Register</BuildButton>
      }
      {user &&

        <LogoutButton onClick={logout}>logout</LogoutButton>
      }
    </ButtonContainer>
  )
}

export default Navbar