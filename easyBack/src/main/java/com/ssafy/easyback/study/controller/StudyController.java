package com.ssafy.easyback.study.controller;

import com.ssafy.easyback.study.model.service.StudyService;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/study")
public class StudyController {
  private StudyService studyService;

  public StudyController(StudyService studyService) {
    this.studyService = studyService;
  }

  @GetMapping
  public String hello(){
    return "성현님 다됐어용!@@@@!미쳤다 미쳤어 라이브리로드!!!";
  }

  @GetMapping("test")
  public ResponseEntity<List<String>> test() throws Exception {
    return ResponseEntity.ok(studyService.getList());
  }
}
