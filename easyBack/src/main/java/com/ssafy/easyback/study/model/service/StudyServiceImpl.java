package com.ssafy.easyback.study.model.service;

import com.ssafy.easyback.study.model.dto.OptionDto;
import com.ssafy.easyback.study.model.dto.TestDto;
import com.ssafy.easyback.study.model.dto.WordDto;
import com.ssafy.easyback.study.model.dto.WordMeaningDto;
import com.ssafy.easyback.study.model.mapper.WordMapper;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class StudyServiceImpl implements StudyService{
  private WordMapper wordMapper;

  public StudyServiceImpl(WordMapper wordMapper) {
    this.wordMapper = wordMapper;
  }
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
    List<Integer> answer = wordMapper.createAnswer(param.get("level"));  // 시험 레벨 설정

    for(int i=0; i<answer.size(); i++) {    // 20개 정답, 뜻, 오답보기2개 만들어서 db에 넣기
      int wordId = answer.get(i);
      List<WordMeaningDto> meaning = wordMapper.getMeaning(wordId);  // 정답 뜻 가져오기
      List<String> wrong = wordMapper.createWrong(wordId); // 오답보기 2개 생성하기
      param.put("wordId",wordId);                         //정답 wordId
      param.put("answer",meaning.get(0).getMeaning());    // 정답 보기 세팅
      if (wrong.size() == 2) {
        param.put("wrong1", wrong.get(0));    // 오답 보기1 세팅
        param.put("wrong2", wrong.get(1));    // 오답 보기2 세팅
      }
      wordMapper.insertWordTests(param);   //db에 넣기
    }
    return wordMapper.getWordTest(testId);  // 테스트 정보들 모두 가져오기
  }
}
