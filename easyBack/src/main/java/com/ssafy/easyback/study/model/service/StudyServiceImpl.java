package com.ssafy.easyback.study.model.service;

import com.google.gson.Gson;
import com.ssafy.easyback.study.model.dto.AccuracyDto;
import com.ssafy.easyback.study.model.dto.OptionDto;
import com.ssafy.easyback.study.model.dto.SentenceDto;
import com.ssafy.easyback.study.model.dto.TestDto;
import com.ssafy.easyback.study.model.dto.WordDto;
import com.ssafy.easyback.study.model.dto.WordMeaningDto;
import com.ssafy.easyback.study.model.mapper.SentenceMapper;
import com.ssafy.easyback.study.model.mapper.WordMapper;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class StudyServiceImpl implements StudyService{
  private final WordMapper wordMapper;
  private final SentenceMapper sentenceMapper;
  @Override
  public List<WordDto> getWordsList(WordDto wordDto) throws Exception {
    List<Integer> myList = wordMapper.getMyWordsList(wordDto.getUserId());
    List<WordDto> list = wordMapper.getWordsList(wordDto);
    HashMap<Integer, Boolean> hm = new HashMap<Integer, Boolean>();
    for(int key : myList) hm.put(key,true);
    for(WordDto word : list)  {
      if(hm.containsKey(word.getWordId())) word.setSaved(true);
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
  public WordDto getWord(WordDto wordDto) throws Exception {    //단어 상세보기
    HashMap<Integer, Boolean> hm = new HashMap<Integer, Boolean>();
    List<Integer> myList = wordMapper.getMyWordsList(wordDto.getUserId());
    WordDto word = wordMapper.getWord(wordDto);
    List<WordMeaningDto> meaning = wordMapper.getMeaning(wordDto.getWordId());
    for(int key : myList) hm.put(key,true);
    if(hm.containsKey(word.getWordId())) word.setSaved(true);
    word.setWordMeaningDto(meaning);
    return word;
  }

  @Override
  @Transactional
  public List<TestDto> getWordTest
      (Map<String, Object> param) throws Exception {  //단어 시험보기
    Long userId = (Long)param.get("userId");    // 유저아이디 얻기
    wordMapper.insertTests(param);             // tests 테이블에 테스트 추가
    int testId = wordMapper.getTestId(userId); // 테스트ID 받아오기
    param.put("testId", testId);                // 테스트ID param에 셋팅
    List<Integer> answer = wordMapper.createAnswer(param.get("level"));  // 시험 문제 랜덤으로 만들기(단어 테이블에서 wordId 20개 pick!!)

    for(int i=0; i<answer.size(); i++) {    // 20개 정답, 뜻, 오답보기2개 만들어서 db에 넣기
      int wordId = answer.get(i);
      List<WordMeaningDto> meaning = wordMapper.getMeaning(wordId);  // 뜻 가져오기
      List<Map<String, String>> wrong = wordMapper.createWrong(wordId); // 오답보기 2개 생성하기
      param.put("wordId",wordId);                         //정답 wordId
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
  public void insertAnswerList(Map<String, Object> param) throws Exception {
    List<HashMap<String,Object>> answers = (List<HashMap<String, Object>>) param.get("answers");
    for(HashMap<String,Object> answer : answers) wordMapper.insertAnswer(answer);
    wordMapper.gradingWordTest(param.get("testId"));
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
  public SentenceDto getSentence(HashMap<String, Object> param) throws Exception {
    HashMap<Integer, Boolean> hm = new HashMap<Integer, Boolean>();
    List<Integer> myList = sentenceMapper.getMySentencesList(param.get("userId"));
    SentenceDto sentence = sentenceMapper.getSentence(param.get("sentenceId"));
    for(int key : myList) hm.put(key,true);
    if(hm.containsKey(sentence.getSentenceId())) sentence.setSaved(true);
    return sentence;
  }

  @Override
  public AccuracyDto getAccuracy(Map<String, Object> param) throws Exception {
    String clientId = "0wj7mepfab";             // Application Client ID";
    String clientSecret = "n7s3dQlngQtgJSpjMfKpe3kyEirZSuC4bVVPzqeD";     // Application Client Secret";
    String FilePath = (String) param.get("url");
    System.out.println(FilePath);
    AccuracyDto accuracyDto = new AccuracyDto();
    try {
      File voiceFile = new File(FilePath);

      String language = "Eng";        // 언어 코드 ( Kor, Jpn, Eng, Chn )
      String apiURL = "https://naveropenapi.apigw.ntruss.com/recog/v1/stt?lang=" + language;
      URL url = new URL(apiURL);

      HttpURLConnection conn = (HttpURLConnection)url.openConnection();
      conn.setUseCaches(false);
      conn.setDoOutput(true);
      conn.setDoInput(true);
      conn.setRequestProperty("Content-Type", "application/octet-stream");
      conn.setRequestProperty("X-NCP-APIGW-API-KEY-ID", clientId);
      conn.setRequestProperty("X-NCP-APIGW-API-KEY", clientSecret);

      OutputStream outputStream = conn.getOutputStream();
      FileInputStream inputStream = new FileInputStream(voiceFile);
      byte[] buffer = new byte[4096];
      int bytesRead = -1;
      while ((bytesRead = inputStream.read(buffer)) != -1) {
        outputStream.write(buffer, 0, bytesRead);
      }
      outputStream.flush();
      inputStream.close();
      BufferedReader br = null;
      int responseCode = conn.getResponseCode();
      if(responseCode == 200) { // 정상 호출
        br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
      } else {  // 오류 발생
        System.out.println("error!!!!!!! responseCode= " + responseCode);
        br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
      }
      String inputLine;

      if(br != null) {
        StringBuffer response = new StringBuffer();
        while ((inputLine = br.readLine()) != null) {
          response.append(inputLine);
        }
        br.close();
        System.out.println(response.toString());
        accuracyDto.setRecognize(response.toString());
      } else {
        System.out.println("error !!!");
      }
    } catch (Exception e) {
      System.out.println(e);
    }
    String originalText = (String) param.get("sentence");
    accuracyDto.setScore(calculateScore(accuracyDto.getRecognize(), originalText));
    return accuracyDto;
  }

  private int calculateScore(String recognize, String originalText) {
    int score = 0;
    process(recognize,originalText);  // 특수문자 제거, 소문자 변환
    return score;
  }

  private void process(String recognize, String originalText) {

  }
}
