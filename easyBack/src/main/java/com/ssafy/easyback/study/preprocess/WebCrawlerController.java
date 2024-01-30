package com.ssafy.easyback.study.preprocess;

import com.ssafy.easyback.study.model.dto.WordDto;
import com.ssafy.easyback.study.model.dto.WordMeaningDto;
import com.ssafy.easyback.study.model.mapper.WordMapper;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("")
public class WebCrawlerController {
  private final WebCrawlerService webCrawlerService;
  @GetMapping("insertword")
  public ResponseEntity<String> insertWord() throws Exception{
    webCrawlerService.insertWord();
    return ResponseEntity.ok("200");
  }

  @GetMapping("insertsentence")
  public ResponseEntity<String> insertSentence() throws Exception{
    webCrawlerService.insertSentence();
    return ResponseEntity.ok("200");
  }
}