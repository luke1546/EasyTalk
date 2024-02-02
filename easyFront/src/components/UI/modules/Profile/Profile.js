// Profile.js

import Textbox from '../../atoms/Text/Textbox';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = ({ userId, profileImg, userName, pageType }) => {
  const navigate = useNavigate();

  const handleUserClick = () => {
    // Navigate to the user's detail page
    navigate(`/user/${userId}`);
  };

  return (
    <div className={`user-info ${pageType === 'horizontal' ? 'horizontal-layout' : 'vertical-layout'}`} onClick={handleUserClick}>
      <img className="profile-img" src={profileImg} alt="Profile" />
      <Textbox section="singleText" context1={userName} />
    </div>
  );
};

export default Profile;
