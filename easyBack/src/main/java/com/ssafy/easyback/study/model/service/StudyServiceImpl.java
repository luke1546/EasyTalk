package com.ssafy.easyback.study.model.service;

import com.ssafy.easyback.study.model.dto.*;
import com.ssafy.easyback.study.model.mapper.MusicMapper;
import com.ssafy.easyback.study.model.mapper.SentenceMapper;
import com.ssafy.easyback.study.model.mapper.WordMapper;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.ssafy.easyback.study.stt.SpeechToText;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
@Transactional
public class StudyServiceImpl implements StudyService{
  private final WordMapper wordMapper;
  private final SentenceMapper sentenceMapper;
  private final MusicMapper musicMapper;
  private final SpeechToText speechToText;
  @Override
  public List<WordDto> getWordsList(WordDto wordDto) throws Exception {
    List<Integer> myList = wordMapper.getMyWordsList(wordDto.getUserId());
    List<WordDto> list = wordMapper.getWordsList(wordDto);
    HashMap<Integer, Boolean> hm = new HashMap<Integer, Boolean>();
    for(int key : myList) hm.put(key,true);
    for(WordDto word : list)  {
      if(hm.containsKey(word.getWordId())) word.setIsSaved(true);
      List<WordMeaningDto> meaning = wordMapper.getMeaning(word.getWordId());
      word.setWordMeaningDto(meaning);
    }
    return list;
  }

  @Override
  public void addToMyWordBook(WordDto wordDto) throws Exception { //내 단어장에 단어 추가
    wordMapper.addToMyWordBook(wordDto);
  }

  @Override
  public void deleteWord(WordDto wordDto) throws Exception {
    wordMapper.deleteWord(wordDto);
  }

  @Override
  public WordDto getWord(WordDto wordDto) throws Exception {    //단어 상세보기
    HashMap<Integer, Boolean> hm = new HashMap<Integer, Boolean>();
    List<Integer> myList = wordMapper.getMyWordsList(wordDto.getUserId());
    WordDto word = wordMapper.getWord(wordDto);
    List<WordMeaningDto> meaning = wordMapper.getMeaning(wordDto.getWordId());
    for(int key : myList) hm.put(key,true);
    if(hm.containsKey(word.getWordId())) word.setIsSaved(true);
    word.setWordMeaningDto(meaning);
    return word;
  }

  @Override
  public List<TestDto> getWordTest
      (Map<String, Object> param) throws Exception {  //단어 시험보기
    Long userId = (Long)param.get("userId");    // 유저아이디 얻기
    param.put("testTitle","단어시험");

    int musicId = (Integer) param.get("musicId");

    if(musicId != 0 ) {
      String title = musicMapper.getMusicInfo(musicId).getTitle();  // 음악 정보 받아오기
      param.put("testTitle", title); // 음악 제목 셋팅
    }

    wordMapper.insertTests(param);             // tests 테이블에 테스트 추가
    int testId = wordMapper.getTestId(userId); // 테스트ID 받아오기
    param.put("testId", testId);                // 테스트ID param에 셋팅

    List<Integer> answer = wordMapper.createAnswer(param);  // 시험 문제 랜덤으로 만들기(단어 테이블에서 wordId 20개 pick!!)

    for(int i=0; i<answer.size(); i++) {    // 20개 정답, 뜻, 오답보기2개 만들어서 db에 넣기
      int wordId = answer.get(i);
      List<WordMeaningDto> meaning = wordMapper.getMeaning(wordId);  // 뜻 가져오기
      List<Map<String, String>> wrong = wordMapper.createWrong(wordId); // 오답보기 2개 생성하기
      param.put("wordId",wordId);                         //정답 wordId
      System.out.println(meaning);
      param.put("meaning",meaning.get(0).getMeaning());    // 정답 보기 세팅

      if (wrong.size() == 2) {
        if(param.get("testType").equals("meaning")) {
          param.put("wrong1", wrong.get(0).get("meaning"));    // 오답 보기1 세팅
          param.put("wrong2", wrong.get(1).get("meaning"));    // 오답 보기2 세팅
        }else{
          param.put("wrong1", wrong.get(0).get("word"));    // 오답 보기1 세팅
          param.put("wrong2", wrong.get(1).get("word"));    // 오답 보기2 세팅
        }
      }
      wordMapper.insertWordTests(param);   //db에 넣기
    }
    return wordMapper.getWordTest(testId);  // 테스트 정보들 모두 가져오기
  }

  @Override
  public void insertAnswerList(HashMap<String, Object> param) throws Exception {
    List<AnswerDto> answerList = (List<AnswerDto>) param.get("answerList");
    Long userId = (Long) param.get("userId");
    for(AnswerDto answer : answerList) wordMapper.insertAnswer(answer);
    int testId = wordMapper.getTestId((Long)param.get("userId"));
    param.put("testId", testId);
    wordMapper.gradingWordTest(testId);
    wordMapper.getExp(param);
  }

  @Override
  public List<SentenceDto> getSentencesList(SentenceDto sentenceDto) throws Exception {
    HashMap<Integer, Boolean> mySentenceMap = new HashMap<Integer, Boolean>();
    List<Integer> myList = sentenceMapper.getMySentencesList(sentenceDto.getUserId());
    List<SentenceDto> list = sentenceMapper.getSentencesList(sentenceDto);
    for(int key : myList) mySentenceMap.put(key,true);
    for(SentenceDto sentence : list)  {
      if(mySentenceMap.containsKey(sentence.getSentenceId()))
        sentence.setSaved(true);
    }
    return list;
  }

  @Override
  public void addToMySentenceBook(SentenceDto sentenceDto) throws Exception {
    sentenceMapper.addToMySentenceBook(sentenceDto);
  }

  @Override
  public void deleteSentence(SentenceDto sentenceDto) throws Exception {
    sentenceMapper.deleteSentence(sentenceDto);
  }

  @Override
  public SentenceDto getSentence(HashMap<String, Object> param) throws Exception {
    HashMap<Integer, Boolean> hm = new HashMap<Integer, Boolean>();
    List<Integer> myList = sentenceMapper.getMySentencesList(param.get("userId"));
    SentenceDto sentence = sentenceMapper.getSentence(param.get("sentenceId"));
    for(int key : myList) hm.put(key,true);
    if(hm.containsKey(sentence.getSentenceId())) sentence.setSaved(true);
    return sentence;
  }

  @Override
  public List<MusicDto> getMusicList(MusicDto musicDto) throws Exception {
    return musicMapper.getMusicList(musicDto);
  }

  @Override
  public List<LyricsDto> getMusicDetail(int musicId) throws Exception {
    musicMapper.addMusicHit(musicId);
    return musicMapper.getMusicDetail(musicId);
  }

  @Override
  public MusicTestDto getMusicTest(HashMap<String, Object> param) throws Exception {
    int musicId = (int) param.get("musicId");
    Long userId = (Long) param.get("userId");
    String title = musicMapper.getMusicInfo(musicId).getTitle();
    param.put("testTitle", title);
    wordMapper.insertTests(param);
    int testId = wordMapper.getTestId(userId); // 테스트ID 받아오기
    param.put("testId", testId);                // 테스트ID param에 셋팅
    musicMapper.insertMusicTest(param);
    List<LyricsDto> lyrics = musicMapper.getMusicDetail(musicId);
    MusicTestDto musicTest = new MusicTestDto();
    musicTest.setLyrics(lyrics);
    musicTest.setTestId((Integer) param.get("testId"));
    return musicTest;
  }

  @Override
  public void submitMusicTest(Map<String, Object> param, MultipartFile audioFile) throws Exception {
    int testId = (int) param.get("testId");
    AccuracyDto accuracyDto = speechToText.getLongText(audioFile, "");
    param.put("score", accuracyDto.getScore());
    param.put("recognize", accuracyDto.getRecognize());
    musicMapper.submitMusicTest(param);
  }

  @Override
  public void endMusicTest(HashMap<String, Object> param) throws Exception {
    int testId = (int) param.get("testId");
    int musicId = musicMapper.getMusicId(testId);
    StringBuilder sb = new StringBuilder();
    List<LyricsDto> lyricList = musicMapper.getMusicDetail(musicId);
    for(LyricsDto lyric : lyricList)  sb.append(lyric.getLyric());
    String recognize = musicMapper.getRecognize(testId);
    int score = speechToText.calculateScore(recognize,sb.toString());
    param.put("score", score);
    musicMapper.endMusicTest(param);
    wordMapper.getExp(param);
  }

  @Override
  public Integer getSentenceIdByLyric(Integer lyricId) throws Exception {
    return sentenceMapper.getSentenceIdByLyric(lyricId);
  }

  @Override
  public void addToMyMusicBook(HashMap<String,Object> param) throws Exception {
    MusicDto musicDto2 = musicMapper.getMusicInfo((Integer) param.get("musicId"));
    System.out.println(musicDto2);
    param.put("artistId",(musicDto2.getArtistId()));
    musicMapper.addToMyMusicBook(param);
  }

  @Override
  public void deleteMyMusic(HashMap<String, Object> param) throws Exception {
    musicMapper.deleteMyMusic(param);
  }
  @Override
  public List<RecordDto> getWordRecord(HashMap<String, Object> param) throws Exception {
    return wordMapper.getWordRecord(param);
  }

  @Override
  public List<WordDto> getWordRecordDetail(HashMap<String, Object> param) throws Exception {
    List<Integer> myList = wordMapper.getMyWordsList((Long) param.get("userId"));
    List<WordDto> list = wordMapper.getWordRecordDetail(param);
    HashMap<Integer, Boolean> hm = new HashMap<Integer, Boolean>();
    for(int key : myList) hm.put(key,true);
    for(WordDto word : list) {
      if (hm.containsKey(word.getWordId()))
        word.setIsSaved(true);
    }
    return list;
  }

  @Override
  public List<ArtistDto> getArtistList(HashMap<String, Object> param) throws Exception {
    return musicMapper.getArtistList(param);
  }

  @Override
  public String getMusicTitle(int musicId) throws Exception {
    return musicMapper.getMusicTitle(musicId);
  }

  public TodayDto getTodaySentence() throws Exception {
    TodayDto todayDto = new TodayDto();
    List<WordDto> words = new ArrayList<WordDto>();
    Integer sentenceSize = sentenceMapper.getTodaySentenceSize();
    LocalDate today = LocalDate.now();
    int sentenceHash = Math.abs(today.hashCode()) % sentenceSize;
    int sentenceId = sentenceMapper.getTodaySentenceId(sentenceHash);
    Integer wordSize = sentenceMapper.getTodayWordSize(sentenceId);
    List<Integer> wordIds = new ArrayList<>();
    wordIds.add(Math.abs(today.hashCode()) % wordSize + 1);
    wordIds.add((Math.abs(today.hashCode()) / 10) % wordSize + 1);
    wordIds.add((Math.abs(today.hashCode()) / 100) % wordSize + 1);

    for(int i=0; i<3; i++) {
      WordDto word = new WordDto();
      word.setWordId(wordIds.get(i));
      word = wordMapper.getWord(word);
      List<WordMeaningDto> meaning = wordMapper.getMeaning(word.getWordId());
      word.setWordMeaningDto(meaning);
      words.add(word);
    }
    todayDto.setSentence(sentenceMapper.getSentence(sentenceId));
    todayDto.setWords(words);

    return todayDto;
  }

  @Override
  public Integer getLyricIdBySentence(Integer sentenceId) throws Exception {
    return sentenceMapper.getLyricIdBySentence(sentenceId);
  }
}
