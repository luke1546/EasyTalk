import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tab from './Tab';
import styled from 'styled-components';

const TabBarContainer = styled.div`
  display: flex;
  background-color: white;
  overflow: hidden;
  position: relative;
  margin-bottom: 20px;
  padding: 10px 20px 0 20px; 

  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 20px;
    right: 20px;
    border-bottom: 3px solid #9c9cff;
  }
`;

const StyledTab = styled(Tab)`
  padding: 5px 30px;
  text-decoration: none;
  font-size: 20px;
  color: #121212;

  &.active {
    background-color: #9c9cff;
    color: white;
    border-radius: 20px 20px 0px 0px;
  }

  &:hover {
    font-weight: bold;
  }
`;

const TabBar = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <TabBarContainer>
      {tabs.map((tab, index) => (
        <StyledTab
          key={index}
          label={tab.label}
          to={tab.to}
          onClick={() => handleTabClick(index)}
          className={activeTab === index ? 'active' : ''}
        />
      ))}
    </TabBarContainer>
  );
};

export default TabBar;
