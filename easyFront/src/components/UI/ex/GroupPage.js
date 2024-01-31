// GroupPage.js

import React from 'react';
import TabBar from './TabBar';

const GroupPage = () => {
  const groupTabs = [
    { label: '세부 탭 1', to: '/group/tab1' },
    { label: '세부 탭 2', to: '/group/tab2' },
    { label: '세부 탭 3', to: '/group/tab3' },
    { label: '세부 탭 4', to: '/group/tab4' },
  ];

  return (
    <div>
      <h1>그룹 페이지</h1>
      <TabBar tabs={groupTabs} />
      {/* 그룹 페이지의 내용을 추가하세요 */}
    </div>
  );
};

export default GroupPage;
