package com.ssafy.easyback.study.preprocess;

import com.ssafy.easyback.study.model.dto.WordDto;
import com.ssafy.easyback.study.model.dto.WordMeaningDto;
import com.ssafy.easyback.study.model.mapper.WordMapper;

import java.awt.*;
import java.awt.datatransfer.Clipboard;
import java.awt.datatransfer.StringSelection;
import java.awt.event.KeyEvent;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import lombok.RequiredArgsConstructor;
import org.checkerframework.checker.units.qual.A;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class WebCrawlerServiceImpl implements WebCrawlerService{
  private final WordMapper wordMapper;
  String pronunciation = " ";
  ArrayList<String> partOfSpeech = new ArrayList<>();
  ArrayList<String> meaning = new ArrayList<>();
  String wordAudioUri = "/study/word/audio/";
  ArrayList<String> wordBook = new ArrayList<>();
  String ChromeDriverUri = "C:\\SSAFY\\workplaces\\chromedriver.exe";
  @Override
  public void insert() throws Exception {
      int count = 1;
    for(int level=1; level<7; level++) {
      String filePath =
          "C:\\Users\\SSAFY\\Desktop\\project\\S10P12B307\\easyBack\\wordBook" + level + ".txt";
//     BufferedReader를 사용하여 파일 읽기
      try (BufferedReader reader = new BufferedReader(new FileReader(filePath))) {
        String line;
        // 파일의 끝에 도달할 때까지 한 줄씩 읽어 출력합니다.
          while ((line = reader.readLine()) != null) {
            System.out.print(count++ + ". ");
            crawlingWord(line, level);
          }
        } catch (IOException e) {}
    }
  }

  //네이버 사전 단어장 url로 단어장에 있는 단어들 모두 DB에 넣기!!!
  public void getNaverWordBook(String url, int level) throws Exception {
    System.setProperty("webdriver.chrome.driver", ChromeDriverUri);
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
    meaning = new ArrayList<>();
    partOfSpeech = new ArrayList<>();
    System.setProperty("webdriver.chrome.driver", ChromeDriverUri);
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
    if(wordMapper.checkWord(word) == 0)  {
      wordMapper.insertWord(wordDto);
      for(int i=0; i<mCount; i++){
        wordMeaningDto[i] = new WordMeaningDto();
        wordMeaningDto[i].setWord(word);
        wordMeaningDto[i].setMeaning(meaning.get(i));
        if(partOfSpeech.size()<=i)  wordMeaningDto[i].setPartOfSpeech("");
        else wordMeaningDto[i].setPartOfSpeech(partOfSpeech.get(i));
        wordMapper.insertMeaning(wordMeaningDto[i]);
      }
      wordMapper.updateUri(word);
      System.out.println(word + "와 " + mCount + "개의 뜻이 DB에 입력되었습니다.");
    }else   System.out.println(word + "는 이미 DB에 존재하는 단어입니다.");
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
