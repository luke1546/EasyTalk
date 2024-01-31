package com.ssafy.easyback.study.preprocess;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("preprocess")
public class PreProcessController {
  private final PreProcessService preProcessService;
  @GetMapping("insertword")
  public ResponseEntity<String> insertWord() throws Exception{
    preProcessService.insertWord();
    return ResponseEntity.ok("200");
  }

  @GetMapping("insertsentence")   // 메모장에 저장된 음악정보 넣기
  public ResponseEntity<String> insertSentence() throws Exception{
    preProcessService.insertSentence();
    return ResponseEntity.ok("200");
  }

  @GetMapping("insertmusic")  //메모장에 저장된 가사 넣기
  public ResponseEntity<String> insertMusic() throws Exception{
    preProcessService.insertMusic();
    return ResponseEntity.ok("200");
  }
}