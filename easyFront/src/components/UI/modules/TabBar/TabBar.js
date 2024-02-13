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
    border-bottom: 3px solid #8382ff;
  }
`;

const StyledTab = styled(Tab)`
  padding: 5px 30px;
  text-decoration: none;
  font-size: 18px;
  color: #121212;

  &.active {
    background-color: #8382ff;
    color: white;
    border-radius: 20px 20px 0px 0px;
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

TabBar.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
  })).isRequired,
};

export default TabBar;
