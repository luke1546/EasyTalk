// Profile.js

import Textbox from '../../atoms/Text/Textbox';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = ({ target_userId, profileImageUri, pageType }) => {
  const navigate = useNavigate();

  const handleUserClick = () => {
    navigate(`/user/${target_userId}`);
  };

  return (
    <div className={`user-info ${pageType === 'horizontal' ? 'horizontal-layout' : 'vertical-layout'}`} onClick={handleUserClick}>
      <img className="profile-img" src={profileImageUri} alt="Profile" />
      <Textbox section="singleText" context1={target_userId} />
    </div>
  );
};

export default Profile;
