package com.ssafy.easyback.study.preprocess;

import com.ssafy.easyback.study.model.dto.WordDto;
import com.ssafy.easyback.study.model.dto.WordMeaningDto;
import com.ssafy.easyback.study.model.mapper.StudyMapper;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WebCrawlerServiceImpl implements WebCrawlerService{
  private final StudyMapper studyMapper;
  @Override
  public void insert() throws Exception {
    //
    String word = "star";
    int level = 1;
    String temp[] = new String[2];
    String pronunciation = "";
    ArrayList<String> partOfSpeech = new ArrayList<>();
    ArrayList<String> meaning = new ArrayList<>();
    String wordAudioUri = "/study/word/audio/";
    //변수 선언부

    System.setProperty("webdriver.chrome.driver", "C:\\SSAFY\\workplaces/chromedriver.exe");
    WebDriver driver = new ChromeDriver();
    StringBuilder sb = new StringBuilder();
    driver.get("https://en.dict.naver.com/#/search?range=word&query=" + word);
    Thread.sleep(1000);
    WebElement element = driver.findElement(By.cssSelector(".row"));
    List<WebElement> means = element.findElements(By.cssSelector(".mean"));
    WebElement pron = element.findElement(By.cssSelector(".pronounce_area"));
    for(WebElement mean : means) {
      String pos = mean.findElement(By.cssSelector(".word_class")).getText();
      partOfSpeech.add(pos);
      meaning.add(mean.getText().replace(pos+" ",""));
    }
    pronunciation = pron.getText();
    driver.quit();

    int mCount = meaning.size(); //단어가 가진 뜻의 수
    WordDto wordDto = new WordDto();
    WordMeaningDto[] wordMeaningDto = new WordMeaningDto[mCount];

    wordDto.setWord(word);
    wordDto.setLevel(level);
    wordDto.setPronunciation(pronunciation);
    wordDto.setWordAudioUri(wordAudioUri);

    studyMapper.insertWord(wordDto);
    for(int i=0; i<mCount; i++){
      wordMeaningDto[i] = new WordMeaningDto();
      wordMeaningDto[i].setWord(word);
      wordMeaningDto[i].setMeaning(meaning.get(i));
      wordMeaningDto[i].setPartOfSpeech(partOfSpeech.get(i));
      studyMapper.insertMeaning(wordMeaningDto[i]);
    }
    studyMapper.updateUri(word);
  }
}
