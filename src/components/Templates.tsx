// import React from 'react'
import styled from "@emotion/styled";
const TemplateContainer=styled.div`
display:flex;
flex-wrap:wrap;
// height:600px;
margin: 20px auto;
justify-content:center;
// position absolute;
`;
const Title=styled.h2`
display:flex;
align-items:center;
justify-content:center;
color:#22ADBF;
padding:10px;
margin: 20px auto;
`;
const images=[
      "/temp1.png",
      "/temp2.png",
      "/temp1.png",
      "/temp1.png",
];
const StyledImages = styled.img`
  height: 400px;
  margin: 10px auto;

  &:hover {
    transform: scale(1.1);
    opacity:0.5;
  }
`;
const Templates:React.FC = () => {
  return (
    <>
    <Title>TEMPLATES</Title>
    <TemplateContainer>
    {images && images.map((img, index) => (
  <StyledImages key={index} src={img} />
))}

    </TemplateContainer>
    </>
  )
}

export default Templates