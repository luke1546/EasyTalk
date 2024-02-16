// StudyPage.js

import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import TabBar from "../../UI/modules/TabBar/TabBar";
import WordHomePage from "../Word/WordHomePage";
import MusicHomePage from "../Music/MusicHomePage";
import SentenceHomePage from "../Sentence/SentenceHomePage";

// Music pages import
import MusicDetailPage from "../Music/MusicDetailPage";
import MusicSearchPage from "../Music/MusicSearchPage";
import ArtistDetailPage from "../Music/ArtistDetailPage";
import MusicWordPage from "../Music/MusicWordPage";
import MusicSentencePage from "../Music/MusicSentencePage";
import MusicSharePage from "../Music/MusicSharePage";
import MusicTestPage from "../Music/MusicTestPage";
import TestResultPage from "../Music/TestResultPage";

//Word pages import
import WordTestPage from "../Word/WordTestPage";
import WordListPage from "../Word/WordListPage";
import WordStagePage from "../Word/WordStagePage";
import WordDetailPage from "./WordDetailPage";

//Sentence pages import
import SentenceSituationPage from "../Sentence/SentenceSituationPage";
import SentenceListPage from "../Sentence/SentenceListPage";
import SentenceDetailPage from "./SentenceDetailPage";

const StudyPage = () => {
  return (
    <div>
      <TabBar
        tabs={[
          { label: "노래", to: "" },
          { label: "단어", to: "word" },
          { label: "문장", to: "sentence" },
        ]}
      />
      <Routes>
        <Route path="" element={<MusicHomePage />} />
        <Route path="word" element={<WordHomePage />} />
        <Route path="sentence" element={<SentenceHomePage />} />

        {/* Music Route */}
        <Route path={`/music/:index/:videoId`} element={<MusicDetailPage />} />
        <Route path={`/music/search/:searchValue`} element={<MusicSearchPage />} />
        <Route path={`/music/artist/:artistName`} element={<ArtistDetailPage />} />
        <Route path={`/music/:index/:videoId/word`} element={<MusicWordPage />} />
        <Route path={`/music/:index/:videoId/word/test`} element={<WordTestPage />} />
        <Route path={`/music/:index/:videoId/sentence`} element={<MusicSentencePage />} />
        <Route path={`/music/:index/:videoId/share`} element={<MusicSharePage />} />
        <Route path={`/music/:index/:videoId/test`} element={<MusicTestPage />} />
        <Route path={`/music/:index/:videoId/test/result`} element={<TestResultPage />} />
        {/* <Route path={`/music/:index/:videoId/sentence/:lyricId`} element={<SentenceDetailPage />} /> */}
        
        {/* Word Route */}
        <Route path="word/stage" element={<WordStagePage />} />
        <Route path={`word/stage/:level`} element={<WordListPage />} />
        <Route path="word/my" element={<WordListPage />} />
        <Route path="word/stagetest" element={<WordStagePage />} />
        <Route path={`word/stagetest/:level`} element={<WordTestPage />} />
        <Route path={`word/:wordId/detail`} element={<WordDetailPage />} />

        {/* Sentence Route */}
        <Route path="sentence/situation" element={<SentenceSituationPage />} />
        <Route path="sentence/my" element={<SentenceListPage />} />
        <Route path={`sentence/situation/:type`} element={<SentenceListPage />} />
        <Route path={`sentence/:id/detail`} element={<SentenceDetailPage />} />
      </Routes>
    </div>
  );
};

export default StudyPage;