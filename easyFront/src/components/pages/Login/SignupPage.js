import Button from "../../UI/atoms/Button/Button";
import Input from "../../UI/atoms/Input/Input";
import Line from "../../UI/atoms/Line/Line";
import Textbox from "../../UI/atoms/Text/Textbox";
import styled from "styled-components";

import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const StyledImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
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

const InputDiv = styled.div`
  margin: 20px;
`;

const SignupPage = () => {
  const [nickname, setNickname] = useState("");
  const [info, setInfo] = useState("");
  const [profileImageUri, setProfileImageUri] = useState("");
  // const [phone, setPhone] = useState("");

  const navigate = useNavigate();

  const postLink = process.env.REACT_APP_EASYTALK_URL + process.env.REACT_APP_BACK_PORT;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      nickname: nickname,
      info: info,
      profileImageUri: profileImageUri,
      // phone: phone,
    };

    const config = { "Content-Type": "multipart/form-data" };

    axios
      .post(`/user/register`, data, config, { withCredentials: true })
      // .post(`https://i10b307.p.ssafy.io:8080/user/register`, data, config)
      .then((response) => {
        console.log(response);
        navigate("/home");
      })
      .catch((error) => {
        console.error("There was an error!", error);
        alert("에러입니다!");
      });
  };

  const onChangeImg = (e) => {
    const { files } = e.target;
    const uploadFile = files[0];
    const reader = new FileReader();
    if (uploadFile) {
      reader.readAsDataURL(uploadFile);
    }

    reader.onloadend = () => {
      setProfileImageUri(reader.result);
    };
  };

  return (
    <div className="SignupPage">
      <form onSubmit={handleSubmit}>
        <div>
          <StyledImg src={profileImageUri} />
          <div>
            <StyledInputFile type="file" accept="image/*" onChange={onChangeImg} />
          </div>
        </div>
        <Line />
        <TextDiv>
          <Textbox section="singleText" fontWeight="bold" fontSize="20px" context1="개인정보를 설정해주세요." />
        </TextDiv>
        <InputDiv>
          <Input name="singleInput" placeholder="닉네임을 적어주세요." onChange={(event) => setNickname(event.target.value)} />
        </InputDiv>
        <InputDiv>
          <Input
            name="singleInput"
            placeholder="자기소개를 적어주세요."
            onChange={(event) => setInfo(event.target.value)}
          />
        </InputDiv>
        <br />
        {/* <Input
          name="singleInput"
          placeholder="임시 폰 번호"
          type="tel"
          onChange={(event) => setPhone(event.target.value)}
        /> */}
        <div>
          <Button name="submitBtn" text="설정 완료" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default SignupPage;
