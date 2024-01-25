package com.ssafy.easyback.study.controller;

import com.ssafy.easyback.study.model.dto.WordDto;
import com.ssafy.easyback.study.model.service.StudyService;
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

  @GetMapping("test")
  public ResponseEntity<List<String>> test() throws Exception {
    return ResponseEntity.ok(studyService.getList());
  }

  @GetMapping("word/{userId}")
  public ResponseEntity<List<WordDto>> getList(@PathVariable("userId") long userId, @RequestParam(value="level", defaultValue="1") int level) throws Exception {
    WordDto wordDto = new WordDto();
    wordDto.setUserId(userId);
    wordDto.setLevel(level);
    return ResponseEntity.ok(studyService.getWordList(wordDto));
  }
}
