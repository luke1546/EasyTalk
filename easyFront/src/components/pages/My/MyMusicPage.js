// MyMusicPage.js
import React, { useEffect, useState } from "react";
import MusicBox from "../../UI/modules/MusicBox/MusicBox";
import Button from "../../UI/atoms/Button/Button";
import axios from "axios";

const MyMusicPage = () => {
  const [MyMusic, setMyMusic] = useState([]);

  useEffect(() => {
    fetchMyMusic();
  }, []);

  const fetchMyMusic = async () => {
    try {
      const params = {
        filter: "myList",
      };
      const response = await axios.get("/study/music", { params }, { withCredentials: true });

      setMyMusic(response.data);
      // console.log(response.data)
    } catch (error) {
      console.log("Error my Music", error);
    }
  };

  const [isEditing, setIsEditing] = useState(false);

  // 편집 버튼 상태
  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  // 노래 삭제
  const handleDeleteMusic = async (musicId) => {
    try {
      const params = {
        target: musicId,
      };

      await axios.delete("/study/music", { params });

      fetchMyMusic();
    } catch (error) {
      console.log("Error delete music", error);
    }
  };

  return (
    <div>
      <h3>내가 저장한 노래</h3>
      <hr />
      <div onClick={handleEditClick}>
        <Button name="basicBtn" text={isEditing ? "완료" : "편집"} />
      </div>
      {MyMusic.map((music) => (
        <div key={music.id}>
          <MusicBox
            musicId={music.id}
            musicImageUrl={music.musicImageUri} // 수정부
            title={music.title}
            artistName={music.artistName}
            musicTime={music.musicTime}
            videoId={music.videoId} // 수정부
          />
          {isEditing && (
            <div onClick={() => handleDeleteMusic(music.musicId)}>
              <Button name="delBtn" text="삭제" color="red" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MyMusicPage;
