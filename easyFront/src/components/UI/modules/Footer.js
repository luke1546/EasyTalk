import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="Footer">
      <Link to="/study">
        <button>학습</button>
      </Link>{" "}
      |
      <Link to="/group">
        <button>그룹</button>
      </Link>{" "}
      |
      <Link to="/home">
        <button>홈</button>
      </Link>{" "}
      |
      <Link to="/place">
        <button>광장</button>
      </Link>{" "}
      |
      <Link to="/my">
        <button>마이</button>
      </Link>
    </div>
  );
};

export default Footer;
