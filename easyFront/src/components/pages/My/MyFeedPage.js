// MyFeedPage.js
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import FeedBox from "../../UI/modules/FeedBox/FeedBox";
import axios from "axios";

const MyFeedPage = () => {
  const navigate = useNavigate();
  const [myFeed, setmyFeed] = useState([]);

  useEffect(() => {
    const fetchMyFeed = async () => {
      try {
        const params = {
          type: "myList",
        };

        const response = await axios.get("/neighbor/feed", { params }, { withCredentials: true });

        setmyFeed(response.data);
      } catch (error) {
        console.log("Error myFeed", error);
      }
    };

    fetchMyFeed();
  }, []);

  return (
    <div>
      { myFeed.map((feed) => (
        // 클릭하면 게시글 수정 페이지로 이동
        <div onClick={() => navigate(`/neighbor/feed/${feed.feedId}`)}>
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
  );
};


export default MyFeedPage;