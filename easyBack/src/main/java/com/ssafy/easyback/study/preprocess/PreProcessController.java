package com.ssafy.easyback.study.preprocess;

import com.ssafy.easyback.study.model.dto.ArtistDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("insert")
public class PreProcessController {
  private final PreProcessService preProcessService;
  private final MusicService musicService;
  @GetMapping("word")
  public ResponseEntity<String> insertWord() throws Exception{
    preProcessService.insertWord();
    return ResponseEntity.ok("200");
  }

  @GetMapping("sentence")   // 메모장에 저장된 음악정보 넣기
  public ResponseEntity<String> insertSentence() throws Exception{
    preProcessService.insertSentence();
    return ResponseEntity.ok("200");
  }

  @GetMapping("music")  //메모장에 저장된 가사 넣기
  public ResponseEntity<String> insertMusic() throws Exception{
    musicService.insertMusic();
    return ResponseEntity.ok("200");
  }

  @PostMapping("artist")
  public ResponseEntity<String> insertArtist(@RequestBody ArtistDto artistDto) throws Exception{
    musicService.insertArtist();
    return ResponseEntity.ok("200");
  }
}