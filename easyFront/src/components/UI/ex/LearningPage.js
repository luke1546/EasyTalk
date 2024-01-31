// LearningPage.js

import React from 'react';
import TabBar from './TabBar';

const LearningPage = () => {
  const learningTabs = [
    { label: '세부 탭 A', to: '/learning/tabA' },
    { label: '세부 탭 B', to: '/learning/tabB' },
    { label: '세부 탭 C', to: '/learning/tabC' },
  ];

  return (
    <div>
      <h1>학습 페이지</h1>
      <TabBar tabs={learningTabs} />
      {/* 학습 페이지의 내용을 추가하세요 */}
    </div>
  );
};

export default LearningPage;
