import { Link } from "react-router-dom";

const IntroPage = () => {
  return (
    <div className="IntroPage">
      인트로페이지
      <Link to="/signup">login</Link>
    </div>
  );
};

export default IntroPage;
