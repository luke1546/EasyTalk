import { Link } from "react-router-dom";
import Button from "../atoms/Button/Button";
import styled from "styled-components";

const Footer = () => {
  return (
    <div className="Footer">
      <Link to="/study">
        <Button name="basicBtn" text="학습" />
      </Link>{" "}
      <Link to="/group">
        <Button name="basicBtn" text="그룹" />
      </Link>{" "}
      <Link to="/home">
        <Button name="homeBtn" />
      </Link>{" "}
      <Link to="/place">
        <Button name="basicBtn" text="광장" />
      </Link>{" "}
      <Link to="/my">
        <Button name="basicBtn" text="마이" />
      </Link>
    </div>
  );
};

export default Footer;
