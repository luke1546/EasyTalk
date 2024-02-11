// MyEditPage.js
import React, { useState, useEffect } from "react";
import Input from "../../UI/atoms/Input/Input";
import Button from "../../UI/atoms/Button/Button";
import axios from "axios";
// import customAxios from '../../../api/customAxios';

const MyEditPage = () => {
  const [userData, setUserData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    axios.get(`/user`)
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => console.error('Error user data', error));
  }, []);

  // 이미지 변경 로직
  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  }

  // 프로필 사진, 자기소개 변경 로직
  const handleProfileUpdate = () => {
    const formData = new FormData();
    formData.append('profileImageUri', selectedImage); 

    // 수정 datat 서버에 보내기
    axios.put(`/user`, formData)
      .then(response => {
        console.log('User profile updated', response.data);
      })
      .catch(error => console.error('Error updating user profile', error));
  };

  return (
    <>
      <div>
        <img src={userData.profileImageUri} alt="Profile" />
        <br/>
        <input type="file" text="이미지불러오기" onChange={handleImageChange} />
        {/* <Button name="basicBtn" text="이미지불러오기" onClick={handleImageChange} /> */}
      </div>
      <hr/>
      <Input 
        name="singleInput" 
        value={userData.info} 
        onChange={(e) => setUserData({ ...userData, info: e.target.value })}
      />
      <Button name="basicBtn" text="수정" onClick={handleProfileUpdate} />
    </>
  );
};

export default MyEditPage;
