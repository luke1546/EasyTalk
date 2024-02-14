import React, { useState, useEffect } from "react";
import Input from "../../UI/atoms/Input/Input";
import Button from "../../UI/atoms/Button/Button";
import Line from "../../UI/atoms/Line/Line";
import Textbox from "../../UI/atoms/Text/Textbox";
import axios from "axios";
import styled from 'styled-components';

// Styled-components 추가
const EditContainer = styled.div`
  
`;

const ProfileImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
`;

const InputDiv = styled.div`
  margin: 20px;
`;

const StyledInputFile = styled.input`
  // &[type='file'] {
  //   border: 2px solid #8382ff;
  // }
  padding: 10px 20px;
  margin: 20px;
  border-radius: 50px;
  font-size: 18px;
`;

const TextDiv = styled.div`
  color: #8382ff;
  padding: 20px;
`;

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
    console.log("클릭했다")
    const formData = new FormData();
    formData.append('profileImage', selectedImage);
    formData.append('info', userData.info);

    // 수정 datat 서버에 보내기
    axios.put(`/user`, formData)
      .then(response => {
        console.log('User profile updated', response.data);
      })
      .catch(error => console.error('Error updating user profile', error));
  };

  return (
    <EditContainer>
      <div>
        <ProfileImage src={"https://easy-s3-bucket.s3.ap-northeast-2.amazonaws.com"+userData.profileImageUri} alt="Profile" />
        <br/>
        <div>
            <StyledInputFile type="file" accept="image/*" onChange={handleImageChange} />
          </div>
      </div>
      <Line />
      <TextDiv>
          <Textbox section="singleText" fontWeight="bold" fontSize="20px" context1="한 줄 소개를 작성해 주세요." />
        </TextDiv>
      <InputDiv>
        <Input name="singleInput"
          placeholder="한 줄 소개를 작성해 주세요."
          value={userData.info}
          onChange={(e) => setUserData({ ...userData, info: e.target.value })} />
      </InputDiv>
      <div onClick={() => handleProfileUpdate()}>
        <Button className="btn-update" name="submitBtn" text="등록" onClick={() => handleProfileUpdate()}/>
      </div>
    </EditContainer>
  );
};

export default MyEditPage;
