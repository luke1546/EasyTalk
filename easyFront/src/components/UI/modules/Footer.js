import { Link } from "react-router-dom";
import Button from "../atoms/Button/Button";
import styled from "styled-components";
// import Textbox from "../atoms/Text/Textbox";

const StyledFooter = styled.div`
  display: flex; 
  justify-content: space-between;  
  // border: 2px solid #8382ff;
  // border-radius: 20px 20px 0 0;
  align-items: center;
  padding: 0px 5% 15px 5%;
  width: 100%;
  margin: 0 20%;
  box-shadow: 0px -4px 2px -2px #8382ff;

  @media (max-width: 768px) {
    margin: 0;
    border: 0;
    border-radius: 0;
    x-shadow: 0px -4px 2px -2px #8382ff;
  }
`;


const Footer = () => {
  return (
    <StyledFooter className="Footer">
      <Link to="/study">
        <Button name="footerBtn" text="학습" size="20px"/>
      </Link>{" "}
      <Link to="/group">
        <Button name="footerBtn" text="그룹" size="20px"/>
      </Link>{" "}
      <Link to="/home">
        <Button name="homeBtn" size="35"/>
      </Link>{" "}
      <Link to="/place">
        <Button name="footerBtn" text="광장" size="20px"/>
      </Link>{" "}
      <Link to="/my">
        <Button name="footerBtn" text="마이" size="20px"/>
      </Link>
    </StyledFooter>
  );
};

export default Footer;
