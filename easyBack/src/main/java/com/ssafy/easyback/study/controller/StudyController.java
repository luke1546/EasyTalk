package com.ssafy.easyback.study.controller;

import com.ssafy.easyback.study.model.dto.OptionDto;
import com.ssafy.easyback.study.model.dto.WordDto;
import com.ssafy.easyback.study.model.service.StudyService;
import jakarta.servlet.http.HttpSession;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/study")
public class StudyController {
  private StudyService studyService;

  public StudyController(StudyService studyService) {
    this.studyService = studyService;
  }


  @GetMapping("word") //단어 리스트 불러오기
  public ResponseEntity<List<WordDto>> getWordsList(
      @RequestParam(value="level", defaultValue="1") int level,
      @RequestParam(value="filter", defaultValue = "list") String filter,
      @RequestParam(value="order", defaultValue = "name") String order,
      @RequestParam(value="sort", defaultValue = "asc") String sort,
      HttpSession session
      ) throws Exception {
    Long userId = (Long) session.getAttribute("userId");
    WordDto wordDto = new WordDto();
    OptionDto optionDto = new OptionDto();

    wordDto.setUserId(userId);
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
}
