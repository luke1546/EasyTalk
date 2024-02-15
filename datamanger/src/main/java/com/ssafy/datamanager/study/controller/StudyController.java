package com.ssafy.datamanager.study.controller;

import com.ssafy.datamanager.study.model.dto.LyricsDto;
import com.ssafy.datamanager.study.model.dto.MusicDto;
import com.ssafy.datamanager.study.model.dto.SentenceDto;
import com.ssafy.datamanager.study.model.service.MusicService;
import com.ssafy.datamanager.study.model.service.PreProcessService;
import com.ssafy.datamanager.study.model.dto.ArtistDto;
import java.util.HashMap;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("study")
@Transactional
public class StudyController {
  private final PreProcessService preProcessService;
  private final MusicService musicService;

  @PostMapping("word")
  public ResponseEntity<String> insertWord(@RequestParam("word") String word, @RequestParam("level") Integer level) throws Exception{
    preProcessService.insertWord(word, level);
    return ResponseEntity.ok("200");
  }

  @PostMapping("wordlist")
  public ResponseEntity<String> insertWordList(@RequestParam("filePath") String filePath, @RequestParam("level") Integer level) throws Exception{
    preProcessService.insertWordList(filePath, level);
    return ResponseEntity.ok("200");
  }

  @PostMapping("dictionary")
  public ResponseEntity<String> insertWordList(@RequestParam("url") String url, @RequestParam("filePath") String filePath) throws Exception{
    preProcessService.getDictionary(url, filePath);
    return ResponseEntity.ok("200");
  }


  @PostMapping("sentence")   // 메모장에 저장된 문장정보 넣기
  public ResponseEntity<String> insertSentence(@RequestParam("filePath") String filePath) throws Exception{
    preProcessService.insertSentence(filePath);
    return ResponseEntity.ok("200");
  }

  @PostMapping("artist")
  public ResponseEntity<String> insertArtist(@ModelAttribute ArtistDto artistDto) throws Exception{
    musicService.insertArtist(artistDto);
    return ResponseEntity.ok("200");
  }

  @PostMapping("music")  //메모장에 저장된 가사 넣기
  public ResponseEntity<String> insertMusic(@RequestParam("artistName") String artistName, @RequestParam("videoId") String videoId) throws Exception{
    musicService.insertMusic(artistName, videoId);
    return ResponseEntity.ok("200");
  }

  @GetMapping("music/list")
  public ResponseEntity<List<MusicDto>> getMusicList() throws Exception {
    return ResponseEntity.ok(musicService.getMusicList());
  }
  @GetMapping("music/detail")
  public ResponseEntity<List<LyricsDto>> getMusicDetail(@RequestParam("musicId") int musicId) throws Exception{
    return ResponseEntity.ok(musicService.getMusicDetail(musicId));
  }

  @DeleteMapping("music/lyric")
  public ResponseEntity<String> deleteLyric(@RequestParam("lyricId") int lyricId) throws Exception{
    musicService.deleteLyric(lyricId);
    return ResponseEntity.ok("200");
  }

  @PostMapping("music/word")
  public ResponseEntity<String> insertMusicWord(@RequestParam("musicId") int musicId) throws Exception{
    preProcessService.insertMusicWord(musicId);
    return ResponseEntity.ok("200");
  }

  @PutMapping("music/lyric")
  public ResponseEntity<String> updateLyric(@RequestBody HashMap<String, Object> param) throws Exception{
    musicService.updateLyric(param);
    return ResponseEntity.ok("200");
  }

  @GetMapping("sentence/list")
  public ResponseEntity<List<SentenceDto>> getSentenceList() throws Exception {
    return ResponseEntity.ok(preProcessService.getSentenceList());
  }

  @PutMapping("sentence/update")
  public ResponseEntity<String> setSentenceType(@RequestBody HashMap<String, Object> param) throws Exception {
    preProcessService.setSentenceType(param);
    return ResponseEntity.ok("ok");
  }

  @GetMapping("lyric")
  public ResponseEntity<String> insertLyrics() throws Exception {
    preProcessService.insertLyrics();
    return ResponseEntity.ok("200");
  }
}