package com.ssafy.easyback.study.controller;

import com.ssafy.easyback.study.model.dto.AccuracyDto;
import com.ssafy.easyback.study.model.dto.LyricsDto;
import com.ssafy.easyback.study.model.dto.MusicDto;
import com.ssafy.easyback.study.model.dto.OptionDto;
import com.ssafy.easyback.study.model.dto.RecordDto;
import com.ssafy.easyback.study.model.dto.SentenceDto;
import com.ssafy.easyback.study.model.dto.TestDto;
import com.ssafy.easyback.study.model.dto.WordDto;
import com.ssafy.easyback.study.model.service.StudyService;
import com.ssafy.easyback.study.stt.SpeechToText;
import jakarta.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@RestController
@RequestMapping("/study")
public class StudyController {
  private final StudyService studyService;
  private final SpeechToText speechToText;
  private final int PAGE_SIZE = 20;
  @GetMapping("word") //단어 리스트 불러오기
  public ResponseEntity<List<WordDto>> getWordsList(
      @RequestParam(value="filter", defaultValue = "list") String filter,
      // list, myList, music
      @RequestParam(value="order", defaultValue = "wordId") String order,
      @RequestParam(value="sort", defaultValue = "asc") String sort,
      @RequestParam(value="level", defaultValue="1") int level,
      @RequestParam(value="page", defaultValue = "1") int page,
      @RequestParam(value="target", defaultValue = "1") int musicId,
      HttpSession session
      ) throws Exception {
    Long userId = (Long) session.getAttribute("userId");
    WordDto wordDto = new WordDto();
    OptionDto optionDto = new OptionDto();
    int start = page*PAGE_SIZE-20;
    int end = start+PAGE_SIZE-1;
    optionDto.setFilter(filter);
    optionDto.setOrder(order);
    optionDto.setSort(sort);
    optionDto.setStart(start);
    optionDto.setEnd(end);

    wordDto.setUserId(userId);
    wordDto.setLevel(level);
    wordDto.setMusicId(musicId);
    wordDto.setOptionDto(optionDto);
    return ResponseEntity.ok(studyService.getWordsList(wordDto));
  }

  @PostMapping("word") //내 단어장에 단어 자장하기
  public ResponseEntity<String> addToMyWordBook(@RequestBody WordDto wordDto ,HttpSession session) throws Exception {
    Long userId = (Long) session.getAttribute("userId");
    wordDto.setUserId(userId);
    studyService.addToMyWordBook(wordDto);
    return ResponseEntity.ok("ok");
  }

  @GetMapping("word/detail") //단어 상세화면
  public ResponseEntity<WordDto> getWord(@RequestParam(value="target") int wordId, HttpSession session)
      throws Exception {
    WordDto wordDto = new WordDto();
    Long userId = (Long) session.getAttribute("userId");
    wordDto.setUserId(userId);
    wordDto.setWordId(wordId);
    return ResponseEntity.ok(studyService.getWord(wordDto));
  }

  @GetMapping("word/test")      // 시험 시작(문제만들기, 문제입력)
  public ResponseEntity<List<TestDto>> getWordTest(
      @RequestParam(value="testType", defaultValue = "meaning") String testType,
      @RequestParam(value="level", defaultValue = "1") int level,
      @RequestParam(value="filter", defaultValue = "list") String filter,
      @RequestParam(value="target", defaultValue = "0") int musicId,
      HttpSession session
  ) throws Exception {
    Map<String, Object> param = new HashMap<String, Object>();
    Long userId = (Long) session.getAttribute("userId");
    param.put("userId", userId);
    param.put("testType", testType);
    param.put("level", level);
    param.put("filter", filter);
    param.put("musicId", musicId);

    return ResponseEntity.ok(studyService.getWordTest(param));
  }

  @PutMapping("word/test")      // 사용자 시험지 제출 -> 스코이 기입, 사용자 입력값 기입
  public ResponseEntity<String> insertAnswerList(@RequestBody Map<String, Object> param) throws Exception {
    studyService.insertAnswerList(param);
    return ResponseEntity.ok("ok");
  }

  @GetMapping("sentence")
  public ResponseEntity<List<SentenceDto>> getSentenceList(
      @RequestParam(value="filter", defaultValue = "list") String filter,
      @RequestParam(value="order", defaultValue = "sentenceId") String order,
      @RequestParam(value="sort", defaultValue = "asc") String sort,
      @RequestParam(value="page", defaultValue = "1") int page,
      HttpSession session
  ) throws Exception {
    Long userId = (Long) session.getAttribute("userId");
    SentenceDto sentenceDto = new SentenceDto();
    OptionDto optionDto = new OptionDto();
    int start = page*PAGE_SIZE-20;
    int end = start+PAGE_SIZE-1;
    optionDto.setFilter(filter);
    optionDto.setOrder(order);
    optionDto.setSort(sort);
    optionDto.setStart(start);
    optionDto.setEnd(end);
    sentenceDto.setUserId(userId);
    sentenceDto.setOptionDto(optionDto);
    return ResponseEntity.ok(studyService.getSentencesList(sentenceDto));
  }

  @PostMapping("sentence") //문장 자장하기
  public ResponseEntity<String> addToMySentenceBook(@RequestBody SentenceDto sentenceDto ,HttpSession session) throws Exception {
    Long userId = (Long) session.getAttribute("userId");
    sentenceDto.setUserId(userId);
    studyService.addToMySentenceBook(sentenceDto);
    return ResponseEntity.ok("ok");
  }

  @GetMapping("sentence/detail") //단어 상세화면
  public ResponseEntity<SentenceDto> getSentence(@RequestParam(value="target") int sentenceId, HttpSession session) throws Exception {
    SentenceDto sentenceDto = new SentenceDto();
    Long userId = (Long) session.getAttribute("userId");
    HashMap<String, Object> param = new HashMap<>();
    param.put("userId", userId);
    param.put("sentenceId", sentenceId);
    return ResponseEntity.ok(studyService.getSentence(param));
  }

  @PostMapping("speech")
  public ResponseEntity<AccuracyDto> SpeechToText(@RequestParam("audio") MultipartFile audioFile, @RequestParam("sentence") String sentence)  throws Exception {
    return ResponseEntity.ok(speechToText.getAccuracy(audioFile, sentence));
  }
//don't cry snowman not in front of me
  @GetMapping("music")    // 음악 리스트 가져오기
  public ResponseEntity<List<MusicDto>> getMusicList(
      @RequestParam(value="order", defaultValue = "hit") String order,
      @RequestParam(value="sort", defaultValue = "desc") String sort,
      @RequestParam(value="page", defaultValue = "1") int page,
      @RequestParam(value="keyword", defaultValue = "") String keyword,
      @RequestParam(value="filter", defaultValue = "list") String filter,
      HttpSession session
  ) throws Exception {
    Long userId = (Long) session.getAttribute("userId");
    MusicDto musicDto = new MusicDto();
    OptionDto optionDto = new OptionDto();
    int start = page*PAGE_SIZE-20;
    int end = start+PAGE_SIZE-1;
    musicDto.setKeyword(keyword);
    optionDto.setOrder(order);
    optionDto.setSort(sort);
    optionDto.setStart(start);
    optionDto.setEnd(end);
    optionDto.setFilter(filter);
    musicDto.setUserId(userId);
    musicDto.setOptionDto(optionDto);
    return ResponseEntity.ok(studyService.getMusicList(musicDto));
  }

  @GetMapping("music/detail")   // 음악 가사 정보 가져오기
  public ResponseEntity<List<LyricsDto>> getMusicDetail(@RequestParam("target") int musicId) throws Exception{
    return ResponseEntity.ok(studyService.getMusicDetail(musicId));
  }

  @GetMapping("music/test")   // 음악 시험 시작하기 (노래 전체 따라부르기 시험)
  public ResponseEntity<List<LyricsDto>> getMusicTest(@RequestParam("target") int musicId, HttpSession session) throws Exception{
    HashMap<String, Object> param = new HashMap<>();
    Long userId = (Long) session.getAttribute("userId");
    param.put("musicId", musicId);
    param.put("userId", userId);
    return ResponseEntity.ok(studyService.getMusicTest(param));
  }

  @PutMapping("music/test")     // 음악 사용자 audio data multipart/form-data 형태로 받기
  public ResponseEntity<String> submitMusicTest(@RequestParam("audio") MultipartFile audioFile, @RequestParam("target") int testId, HttpSession session) throws Exception{
    HashMap<String, Object> param = new HashMap<>();
    Long userId = (Long) session.getAttribute("userId");
    param.put("userId", userId);
    param.put("testId", testId);
    studyService.submitMusicTest(param, audioFile);
    return ResponseEntity.ok("200");
  }

  @PostMapping("music") // 음악 자장하기
  public ResponseEntity<String> addToMyMusicBook(@RequestBody HashMap<String,Object> param, HttpSession session) throws Exception {
    Long userId = (Long) session.getAttribute("userId");
    param.put("userId",userId);
    studyService.addToMyMusicBook(param);
    return ResponseEntity.ok("ok");
  }

  @DeleteMapping("music")
  public ResponseEntity<String> deleteMyMusic(@RequestParam("target") int musicId, HttpSession session) throws Exception {
    HashMap<String, Object> param = new HashMap<>();
    Long userId = (Long) session.getAttribute("userId");
    param.put("userId", userId);
    param.put("musicId", musicId);
    studyService.deleteMyMusic(param);
    return ResponseEntity.ok("200");
  }

  @GetMapping("test/record")
  public ResponseEntity<List<RecordDto>> getWordRecord(
      @RequestParam(value="order", defaultValue = "startTime") String order,
      @RequestParam(value="sort", defaultValue = "desc") String sort,
      @RequestParam(value="target", defaultValue = "word") String target,
      HttpSession session
  ) throws Exception{
    HashMap<String, Object> param = new HashMap<>();
    Long userId = (Long) session.getAttribute("userId");
    param.put("userId", userId);
    param.put("order", order);
    param.put("sort", sort);
    param.put("target", target);
    return ResponseEntity.ok(studyService.getWordRecord(param));
  }

  @GetMapping("test/record/detail")
  public ResponseEntity<List<WordDto>> getWordRecordDetail(
      @RequestParam(value="target") String testId,
      HttpSession session
  ) throws Exception{
    HashMap<String, Object> param = new HashMap<>();
    Long userId = (Long) session.getAttribute("userId");
    param.put("userId", userId);
    param.put("testId", testId);
    return ResponseEntity.ok(studyService.getWordRecordDetail(param));
  }
}
