// PlaceHomePage.js
import InputBar from "../../UI/modules/InputBar";
import SNSInputBox from "../../UI/modules/SNSInputBox/SNSInputBox";
import FeedBox from "../../UI/modules/FeedBox/FeedBox";
import Icon from "../../UI/atoms/Icon/Icon";
import Profile from "../../UI/modules/Profile";
import Line from "../../UI/atoms/Line/Line";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { RiSafariFill } from "react-icons/ri";
import styled from "styled-components";

const ProfileDiv = styled.div`
  border: 2px solid #9c9cff;
  border-radius: 20px;
  margin: 20px;
  box-shadow: 0px 5px 6px -4px #9c9cff;

  &:hover {
    box-shadow: 0px 5px 6px 0px #9c9cff;
  }
`;

const StyledP = styled.p`
  font-weight: bold;
`;

const PlaceHomePage = () => {
  const navigate = useNavigate();

  const [hasNeighbors, setHasNeighbors] = useState(false);
  const [myFeed, setmyFeed] = useState([]);

  const inputRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState(""); // 검색어를 저장하는 상태
  const [searchResults, setSearchResults] = useState([]); // 검색 결과를 저장하는 상태

  useEffect(() => {
    const fetchMyFeed = async () => {
      try {
        const params = {
          type: "List",
        };

        const response = await axios.get("/neighbor/feed", { params }, { withCredentials: true });

        setmyFeed(response.data);
      } catch (error) {
        console.log("Error myFeed", error);
      }
    };

    fetchMyFeed();
  }, []);

  const handleSearchInput = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    // input 엘리먼트가 렌더링된 후에 onChange 이벤트를 추가
    if (inputRef.current) {
      inputRef.current.querySelector("input").addEventListener("change", handleSearchInput);
    }

    // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거
    return () => {
      if (inputRef.current) {
        inputRef.current.querySelector("input").removeEventListener("change", handleSearchInput);
      }
    };
  }, []);

  useEffect(() => {
    // 검색어가 변경될 때마다 실행
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(`/neighbor?keyword=${searchTerm}`, {
          withCredentials: true,
        });
        setSearchResults(response.data); // 검색 결과를 상태에 저장
        // console.log("response data", response);
      } catch (error) {
        console.log("Error search", error);
      }
    };

    // 검색어가 있을 경우에만 API 호출
    if (searchTerm) {
      fetchSearchResults();
    } else {
      setSearchResults([]); // 검색어가 없을 경우 검색 결과를 초기화
    }
  }, [searchTerm]); // searchTerm 상태가 변경될 때마다 useEffect 실행

  return (
    <>
      <div className="PlaceHomePage">
        {/* 이웃이 있는지 여부에 따라 다른 내용을 렌더링 */}
        {hasNeighbors ? (
          <>
            <div ref={inputRef}>
              <InputBar variant="searchinputbar" uri="/neighbor/search/" />
            </div>
            <SNSInputBox
              type="post"
              // onContentChange={(value) => setContent(value)}
              // onImagesChange={(value) => setImages(value)}
              // onPost={handlePost}
            />
            <div>
              {myFeed.map((feed) => (
                // 클릭하면 게시글 수정 페이지로 이동
                <div
                  onClick={() =>
                    navigate(`/neighbor/feed/${feed.feedId}`, { state: { feedId: feed.feedId } })
                  }
                >
                  <FeedBox
                    key={feed.feedId}
                    userId={feed.userId} // userId가 있다고 가정합니다.
                    feedId={feed.feedId}
                    profileImg={feed.profileImageUri}
                    userName={feed.nickname}
                    isLiked={false} // 좋아요 여부는 별도로 관리해야 할 것 같습니다.
                    likeCount={feed.heartCount}
                    commentCount={feed.commentCount}
                    content={feed.content}
                    createdDate={feed.registerDate}
                    // feedImageUris={feed.feedImageUris[feed.feedImageUris.length - 1]}
                  />
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <br />
            <Icon name="warningIcon" size="50px" color=" #9c9cff"/>
              <p>아직 내 이웃이 없습니다!
                <br />내 이웃을 추가해주세요.</p>
            <div ref={inputRef}>
              <InputBar variant="searchinputbar" uri="/neighbor/search/" />
            </div>
            {searchResults.map((user) => (
              <div
                key={user.userId}
                onClick={
                  () => navigate(`/placeneighbor`, { state: { user } }) // 사용자 데이터를 상태로 전달
                }
              >
                <ProfileDiv>
                  <StyledP>
                    검색결과
                  </StyledP>
                  <Line/>
                <Profile
                  // userId={user.userId}
                  // profileImg={user.profileImg}
                  text1={user.nickname}
                  text2={user.info}
                  pageType="horizontal-layout"
                />
                </ProfileDiv>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default PlaceHomePage;
