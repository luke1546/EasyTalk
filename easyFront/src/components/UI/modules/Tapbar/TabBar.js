// TabBar.js

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Tab from './Tab';
import './TabBar.css';

const TabBar = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="molecule-tab-bar">
      {tabs.map((tab, index) => (
        <Tab
          key={index}
          label={tab.label}
          to={tab.to}
          onClick={() => handleTabClick(index)}
          className={activeTab === index ? 'active' : ''}
        />
      ))}
    </div>
  );
};

TabBar.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
  })).isRequired,
};

export default TabBar;
