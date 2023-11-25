// Import necessary libraries and components
import styled from '@emotion/styled';
import Navbar from './Navbar';
import { FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { profileCompleteStart } from '../redux/slices/profileSlice';
import { RootState } from '../redux/store';
import {toast} from "react-toastify"
import { useNavigate } from 'react-router-dom';
// Styled components for styling
const ProfileComplateContainer = styled.div`
  position: relative;
  display: flex; 
  margin: auto; /* Center horizontally */
  background-color: #e0e4ea;
  align-items: center; /* Center vertically */
  justify-content: center; /* Center horizontally */
   /* Set the height of RegisterContainer to 100% of the viewport height */
`;

const FormContainer = styled.div`
  display: flex;
//   background-color: #fff;
  flex-direction: column;
  width: 50%;
  border-radius: 30px;
  background-color: #fff;
  align-items: center; /* Center vertically */
  justify-content: center; /* Center horizontally */
  padding: 60px; /* Add padding for better aesthetics */
  margin-top:100px;
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
textarea{
    width: 100%;
    padding: 10px 40px 30px 10px; /* Adjust padding for the icon */
    border: 1px #22A7BF solid;
    margin-bottom: 20px; /* Add spacing between inputs */
    position: relative;
    border-radius: 10px;
}
  input[type="submit"] {
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
padding:5px;
`;


// Register component
export const Profile_Complate = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const error1=useSelector((state:RootState)=>state.profile.error)
  const message=useSelector((state:RootState)=>state.profile.message)

  const [data, setData] = useState({
    phone: "",
    address: "",
    certification: "",
    experience: "",
    skills: "",
    personal_interests:"",
    online_profiles: "",
    references: "",
    education: "",
    language: "",
    courses: "",
    birth_date: new Date("2022-05-04"),
    gender: "male",
    file:null
  })
  // const [file, setFile] = useState(null);

  // Create a handler function for the file input change event
  const handleFileChange = (e: any) => {
    // Get the first file from the event target
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Set the file state to the selected file
      setData({ ...data, file: selectedFile });
    }
  };
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(profileCompleteStart(data))
    if(message){
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
          color: 'green',
           // Red text color
           zIndex:'199999999999'
        },
      });
      
      navigate('/');
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
          zIndex:'10000000000000000'

          // Red text color
        },
      });
    }
  }
  const formatDateForInput = (date: Date | null): string => {
    return date ? date.toISOString().split('T')[0] : '';
  };
  return (
    <>
      <ProfileComplateContainer>
        <Navbar />
        <FormContainer>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <Title>Build Your Resume</Title>
            <label htmlFor="image">Image</label>
      <input
        type="file"
        id="image"
        name='file'
        onChange={handleFileChange}
      />
        {data.file && (
        // If there is a file, display it as an image
        <img width={150} style={{borderRadius:"50%"}} src={URL.createObjectURL(data.file)} alt="Selected image" />
      )}
            <label htmlFor="Name">Phone</label>
            <input type="text" value={data.phone}
              onChange={(e) => setData({ ...data, phone: e.target.value })}
              placeholder="📞Enter your Phone Number" className="user-icon" />
            <label htmlFor="text">Address</label>
            <input type="text" value={data.address}
              onChange={(e) => setData({ ...data, address: e.target.value })} placeholder="📩 Enter your address" />
            <label htmlFor="text">Certification</label>
            <textarea value={data.certification}
              onChange={(e) => setData({ ...data, certification: e.target.value })} placeholder='write your Certification'></textarea>
            <label htmlFor="text">Experience</label>
            <textarea value={data.experience}
              onChange={(e) => setData({ ...data, experience: e.target.value })} placeholder='write your expience'></textarea>
            <label htmlFor="text">Skills</label>
            <textarea value={data.skills}
              onChange={(e) => setData({ ...data, skills: e.target.value })} placeholder='write your skills'></textarea>
            <label htmlFor="text">personal Intersts</label>
            <textarea value={data.personal_interests}
              onChange={(e) => setData({ ...data, personal_interests: e.target.value })} placeholder='write your intersets'></textarea>
            <label htmlFor="text">Online Profiles</label>
            <textarea value={data.online_profiles}
              onChange={(e) => setData({ ...data, online_profiles: e.target.value })} placeholder='write your profiles'></textarea>
            <label htmlFor="text">Rferences</label>
            <textarea value={data.references}
              onChange={(e) => setData({ ...data, references: e.target.value })} placeholder='write your references'></textarea>
            <label htmlFor="text">Education</label>
            <textarea value={data.education}
              onChange={(e) => setData({ ...data, education: e.target.value })} placeholder='write education'></textarea>
            <label htmlFor="text">Language</label>
            <textarea value={data.language}
              onChange={(e) => setData({ ...data, language: e.target.value })} placeholder='write Language'></textarea>
            <label htmlFor="text">Major Courses</label>
            <textarea value={data.courses}
              onChange={(e) => setData({ ...data, courses: e.target.value })} placeholder='write courses'></textarea>
            <label htmlFor="text">Birth Date</label>
            <input
              value={data.birth_date ? formatDateForInput(data.birth_date) : ''}
              onChange={(e) => setData({ ...data, birth_date: new Date(e.target.value) })}
              type="date"
              name=""
              id=""
            />
            <label htmlFor="text">Gender</label>

            <div style={{ display: 'flex', gap: '10px' }}>
              <label htmlFor="male" style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  // onChange={() => handleGenderChange('male')}
                  // value={data.gender}
                  onChange={(e) => setData({ ...data, gender: e.target.value })}
                />
                Male
              </label>

              <label htmlFor="female" style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  // onChange={() => handleGenderChange('female')}
                  
                  onChange={(e) => setData({ ...data, gender: e.target.value })}
                />
                Female
              </label>
            </div>

            <input type="submit" value="Build" />
          </form>
        </FormContainer>
      </ProfileComplateContainer>
    </>
  );
};
