import { Link } from "react-router-dom";
import Button from "../atoms/Button/Button";
import styled from "styled-components";

const StyledFooter = styled.div`
  display: flex; 
  justify-content: space-between;  
  align-items: center;
  padding: 0px 20px 15px 20px;
  width: 100%;
  margin: 0 20%;
  

  @media (max-width: 768px) {
    margin: 0;
  }
`;

const Footer = () => {
  return (
    <StyledFooter className="Footer">
      <Link to="/study">
        <Button name="basicBtn" text="학습" size="20px"/>
      </Link>{" "}
      <Link to="/group">
        <Button name="basicBtn" text="그룹" size="20px"/>
      </Link>{" "}
      <Link to="/home">
        <Button name="homeBtn" size="40" />
      </Link>{" "}
      <Link to="/place">
        <Button name="basicBtn" text="광장" size="20px"/>
      </Link>{" "}
      <Link to="/my">
        <Button name="basicBtn" text="마이" size="20px"/>
      </Link>
    </StyledFooter>
  );
};

export default Footer;
