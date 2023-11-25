
import styled from "@emotion/styled";

const FooterContainer = styled.footer`
  background-color: #333;
  color: #fff;
  padding: 40px;
  text-align: center;
`;

const Footer:React.FC = () => {
  return (
    <FooterContainer>
      <p>&copy; 2023 Your Company. All rights reserved.</p>
    </FooterContainer>
  );
};

export default Footer;
