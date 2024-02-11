// StudyPage.js

import React from 'react';
import { Route, Routes } from "react-router-dom";
import TabBar from '../../UI/modules/Tapbar/TabBar';
import WordHomePage from "../Word/WordHomePage";
import MusicHomePage from "../Music/MusicHomePage";
import MusicDetailPage from "../Music/MusicDetailPage";
import WordStagePage from "../Word/WordStagePage";
// import MusicSearchPage from "../Music/MusicSearchPage";
// import ArtistDetailPage from "../Music/ArtistDetailPage";
// import SentenceHomePage from "../Sentence/SentenceHomePage";
import WordTestPage from "../Word/WordTestPage";
import WordListPage from "../Word/WordListPage";

const StudyPage = () => {

  return (
    <div>
      <TabBar tabs={[{ label: '노래', to: '' }, { label: '단어', to: 'word' }, { label: '문장', to: 'sentence' }]} />
      <Routes>
        <Route path="/" element={<MusicHomePage />} />
        <Route path="word/" element={<WordHomePage />} />
        {/* <Route path="sentence/" element={<SentenceHomePage />} /> */}

        {/* Music Route */}
        <Route path={`/:index`} element={<MusicDetailPage />} />
        {/* <Route path={`/search/:searchValue`} element={<MusicSearchPage />} />
        <Route path="/artist/나훈아" element={<ArtistDetailPage />} /> */}

        {/* Word Route */}
        <Route path="word/stage" element={<WordStagePage />} />
        <Route path={`word/stage/:level`} element={<WordListPage />} />
        <Route path="word/my" element={<WordListPage />} />
        <Route path="word/stagetest" element={<WordStagePage />} />
        <Route path={`word/stagetest/:level`} element={<WordTestPage />} />
        {/* <Route path="word/musictest" element={<MusicSearchPage />} /> */}
      </Routes>
    </div>
  );
};

export default StudyPage;