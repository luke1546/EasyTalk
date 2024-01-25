package com.ssafy.easyback.study.preprocess;

import com.ssafy.easyback.study.model.dto.WordDto;
import com.ssafy.easyback.study.model.dto.WordMeaningDto;
import com.ssafy.easyback.study.model.mapper.StudyMapper;

import java.awt.*;
import java.awt.datatransfer.Clipboard;
import java.awt.datatransfer.StringSelection;
import java.awt.event.KeyEvent;
import java.util.ArrayList;
import java.util.List;

import lombok.RequiredArgsConstructor;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WebCrawlerServiceImpl implements WebCrawlerService{
  private final StudyMapper studyMapper;
  String pronunciation = " ";
  ArrayList<String> partOfSpeech = new ArrayList<>();
  ArrayList<String> meaning = new ArrayList<>();
  String wordAudioUri = "/study/word/audio/";
  ArrayList<String> wordBook = new ArrayList<>();
  @Override
  public void insert() throws Exception {
    int level = 3;
    String url = "https://learn.dict.naver.com/wordbook/enkodict/#/my/cards?wbId=5392e185d80b4382b9a694473e8f06d6&qt=0&st=0&name=2019%EB%85%84%EC%97%90%20%EB%A7%8E%EC%9D%B4%20%EA%B2%80%EC%83%89%ED%95%9C%20%EB%8B%A8%EC%96%B4%20200&tab=list";
    getNaverWordBook(url, level);
  }

  //네이버 사전 단어장 url로 단어장에 있는 단어들 모두 DB에 넣기!!!
  public void getNaverWordBook(String url, int level) throws Exception {
    System.setProperty("webdriver.chrome.driver", "C:\\SSAFY\\workspaces/chromedriver.exe");
    WebDriver driver = new ChromeDriver();
    driver.get(url);
    Thread.sleep(500);
    WebElement id = driver.findElement(By.cssSelector("#id"));
    WebElement pw = driver.findElement(By.cssSelector("#pw"));
    Authentication(id, "luke1546");
    Authentication(pw, "umaru1956*");

    pw.sendKeys(Keys.ENTER);
    driver.get(url);
    Thread.sleep(1000);
    WebElement pageElement = driver.findElement(By.cssSelector(".page_num>.total"));
    int page = Integer.parseInt(pageElement.getText());

    for(int i=0; i<page; i++) {
      List<WebElement> words = driver.findElements(By.cssSelector(".cont_word>.title"));
      for (WebElement word : words) {
        String str = word.getText();
        try {
          String num = word.findElement(By.cssSelector(".num")).getText();
          str = str.replace(num, "");
          wordBook.add(str);
        } catch (Exception e) {
          wordBook.add(str);
        }
      }
      if(i<9)    driver.findElement(By.cssSelector(".btn_next")).click();
      Thread.sleep(500);
    }
    driver.quit();

    int cnt=1;
    for(String word : wordBook)   {
      System.out.print(cnt++ + ". ");
      crawlingWord(word, level);
    }
  }

  //단어정보를 가져와서 파싱(분석 및 구조화)!!!
  private void crawlingWord(String word, int level) throws Exception {
    System.setProperty("webdriver.chrome.driver", "C:\\SSAFY\\workspaces/chromedriver.exe");
    WebDriver driver = new ChromeDriver();
    driver.get("https://en.dict.naver.com/#/search?range=word&query=" + word);
    Thread.sleep(1000);
    WebElement element = driver.findElement(By.cssSelector(".row"));
    List<WebElement> means = element.findElements(By.cssSelector(".mean"));
    try {
      WebElement pron = element.findElement(By.cssSelector(".pronounce_area"));
      pronunciation = pron.getText();
    }catch(Exception e){};
    for(WebElement mean : means) {
      try {
        String pos = mean.findElement(By.cssSelector(".word_class")).getText();
        partOfSpeech.add(pos);
        meaning.add(mean.getText().replace(pos + " ", ""));
      }catch(Exception e){
        meaning.add(mean.getText());
      }
    }
    driver.quit();
    putIntoDB(word,level);
  }

  //가져온 단어의 정보들을 DB에 입력하자!!!
  private void putIntoDB(String word, int level) throws Exception {
    int mCount = meaning.size(); //단어가 가진 뜻의 수
    WordDto wordDto = new WordDto();
    WordMeaningDto[] wordMeaningDto = new WordMeaningDto[mCount];

    wordDto.setWord(word);
    wordDto.setLevel(level);
    wordDto.setPronunciation(pronunciation);
    wordDto.setWordAudioUri(wordAudioUri);
    if(studyMapper.checkWord(word) == 0)  {
      studyMapper.insertWord(wordDto);
      for(int i=0; i<mCount; i++){
        wordMeaningDto[i] = new WordMeaningDto();
        wordMeaningDto[i].setWord(word);
        wordMeaningDto[i].setMeaning(meaning.get(i));
        wordMeaningDto[i].setPartOfSpeech(partOfSpeech.get(i));
        studyMapper.insertMeaning(wordMeaningDto[i]);
      }
      studyMapper.updateUri(word);
      System.out.println(word + " 입력됨");
    }else   System.out.println(word + " 이미 존재함");
  }

  //자동입력 로그인방지를 뚫기위한 아이디, 비밀번호 복사 붙여넣기 물리적으로 하기!!!
  private static void copyAndPaste(String textToCopy) throws AWTException {
      StringSelection stringSelection = new StringSelection(textToCopy);
      Clipboard clipboard = Toolkit.getDefaultToolkit().getSystemClipboard();
      clipboard.setContents(stringSelection, null);

      Robot robot = new Robot();
      // Ctrl + V를 누름
      robot.keyPress(KeyEvent.VK_CONTROL);
      robot.keyPress(KeyEvent.VK_V);
      // Ctrl + V를 뗌
      robot.keyRelease(KeyEvent.VK_V);
      robot.keyRelease(KeyEvent.VK_CONTROL);
  }

  //id, pw input태그 클릭하고 복사 붙여넣기 후, 0.5초 휴식!!
  private static void Authentication(WebElement we, String textToCopy) throws AWTException, InterruptedException {
    we.click();
    copyAndPaste(textToCopy);
    Thread.sleep(500);
  }
}
