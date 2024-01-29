package com.ssafy.easyback.study.controller;

import com.ssafy.easyback.study.model.dto.OptionDto;
import com.ssafy.easyback.study.model.dto.TestDto;
import com.ssafy.easyback.study.model.dto.WordDto;
import com.ssafy.easyback.study.model.service.StudyService;
import jakarta.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/study")
public class StudyController {
  private final StudyService studyService;
  private final int PAGE_SIZE = 20;
  @GetMapping("word") //단어 리스트 불러오기
  public ResponseEntity<List<WordDto>> getWordsList(
      @RequestParam(value="level", defaultValue="1") int level,
      @RequestParam(value="filter", defaultValue = "list") String filter,
      @RequestParam(value="order", defaultValue = "wordId") String order,
      @RequestParam(value="sort", defaultValue = "asc") String sort,
      @RequestParam(value="page", defaultValue = "1") int page,
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
    wordDto.setUserId(Long.parseLong("3301009684"));  //session 설정되면 지우기!!
    wordDto.setLevel(level);
    wordDto.setOptionDto(optionDto);

    return ResponseEntity.ok(studyService.getWordsList(wordDto));
  }

  @PostMapping("word") //내 단어장에 단어 자장하기
  public ResponseEntity<String> addToMyWordBook(@RequestBody WordDto wordDto ,HttpSession session) throws Exception {
    Long userId = (Long) session.getAttribute("userId");
    wordDto.setUserId(userId);
    wordDto.setUserId(Long.parseLong("3301009684"));  //session 설정되면 지우기!!
    studyService.addToMyWordBook(wordDto);
    return ResponseEntity.ok("ok");
  }

  @GetMapping("word/detail") //단어 상세화면
  public ResponseEntity<WordDto> getWord(@RequestParam(value="target") int wordId, HttpSession session) throws Exception {
    WordDto wordDto = new WordDto();
    Long userId = (Long) session.getAttribute("userId");
    wordDto.setUserId(userId);
    wordDto.setWordId(wordId);
    wordDto.setUserId(Long.parseLong("3301009684"));  //session 설정되면 지우기!!
    return ResponseEntity.ok(studyService.getWord(wordDto));
  }

  @GetMapping("word/test")
  public ResponseEntity<List<TestDto>> getWordTest(
      @RequestParam(value="testType", defaultValue = "meaning") String testType,
      @RequestParam(value="level", defaultValue = "1") int level,
      HttpSession session
  ) throws Exception {
    Map<String, Object> param = new HashMap<String, Object>();
    Long userId = (Long) session.getAttribute("userId");
    userId = Long.parseLong("3301009684");  //session 설정되면 지우기!!
    param.put("userId", userId);
    param.put("testType", testType);
    param.put("level", 1);
    return ResponseEntity.ok(studyService.getWordTest(param));
  }
}
