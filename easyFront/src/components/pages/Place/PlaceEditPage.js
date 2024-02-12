
import React, { useState } from "react";
import { Link } from "react-router-dom";
import FeedBox from "../../UI/modules/EditFeedBox/EditFeedBox";
import EditFeedBox from "../../UI/modules/EditFeedBox/EditFeedBox";
const PlaceEditPage = () => {
  return (
    <div className="PlaceEditPage">
      광장 게시글 수정 화면
        <>
          <EditFeedBox />
        </>
      </div>
    );
  }
  
  export default PlaceEditPage;