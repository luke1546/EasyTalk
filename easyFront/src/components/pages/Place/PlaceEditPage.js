import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import EditFeedBox from "../../UI/modules/EditFeedBox/EditFeedBox";

const PlaceEditPage = () => {
  const [feed, setFeed] = useState(null); // 게시글 정보를 저장하는 상태
  const { feedId } = useParams();


  useEffect(() => {
    // 이전 페이지에서 넘겨받은 게시글 아이디

    // 게시글 아이디를 이용해서 API를 호출하여 게시글 정보를 가져옴
    axios.get(`/neighbor/feed/${feedId}`, { withCredentials: true })
      .then(response => {
        setFeed(response.data); // 가져온 게시글 정보를 상태에 저장
        console.log(response.data)
      })
      .catch(error => console.error('Error getting feed data', error));
  }, [feedId]);

  return (
    <div className="PlaceEditPage">
      {feed && <EditFeedBox feed={feed} />} {/* 게시글 정보가 있을 때만 EditFeedBox 컴포넌트를 렌더링 */}
    </div>
  );
};

export default PlaceEditPage;

