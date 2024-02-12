// MyGroupPage.js
import React, { useState, useEffect } from "react";
import Icon from "../../UI/atoms/Icon/Icon";
// import customAxios from '../../../api/customAxios';
import axios from "axios";

const MyGroupPage = () => {
  const [myGroups, setmyGroups] = useState([]);

  useEffect(() => {
    const fetchMyGroups = async () => {
      try {
        const params = {
          type: "",
          order: "name"
        };
        const response = await axios.get('/groups', { params });
        
        setmyGroups(response.data);
      } catch (error) {
        console.error("Error my groups", error);
      }
    };

    fetchMyGroups();
  }, []);

  return (
    <div>
      <h3>내가 관리하는 그룹</h3>
      <hr/>
      <ul>
        {myGroups.map((group) => (
          <li key={group.groupId}>
            <div>
              <h2>{group.groupName}</h2>
              <p>{`${group.currentCount} / ${group.limitCount}`}</p>
              <p>{`방장: ${group.leader}`}</p>
              <Icon name="commentIcon" />
              <hr/>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyGroupPage;