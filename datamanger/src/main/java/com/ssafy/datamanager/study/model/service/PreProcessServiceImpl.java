package com.ssafy.datamanager.study.model.service;

import com.ssafy.datamanager.study.model.dto.LyricsDto;
import com.ssafy.datamanager.study.model.dto.SentenceDto;
import com.ssafy.datamanager.study.model.dto.WordDto;
import com.ssafy.datamanager.study.model.dto.WordMeaningDto;
import com.ssafy.datamanager.study.model.mapper.MusicMapper;
import com.ssafy.datamanager.study.model.mapper.SentenceMapper;
import com.ssafy.datamanager.study.model.mapper.WordMapper;
import java.awt.AWTException;
import java.awt.Robot;
import java.awt.Toolkit;
import java.awt.datatransfer.Clipboard;
import java.awt.datatransfer.StringSelection;
import java.awt.event.KeyEvent;
import java.io.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.StringTokenizer;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class PreProcessServiceImpl implements PreProcessService {
  private final WordMapper wordMapper;
  private final SentenceMapper sentenceMapper;
  private final MusicMapper musicMapper;
  String pronunciation = " ";
  ArrayList<String> partOfSpeech = new ArrayList<>();
  ArrayList<String> meaning = new ArrayList<>();
  String wordAudioUri = "/study/data/word/audio/";

  @Value("${chrome.driver.uri}")
  private String ChromeDriverUri;
  @Value("${naver.id}")
  private String naverId;
  @Value("${naver.pw}")
  private String naverPw;

  @Override
  public void insertWordList(String filePath, int level) throws Exception {
      int count = 1;
        try (BufferedReader reader = new BufferedReader(new FileReader(filePath))) {
          String line;
          while ((line = reader.readLine()) != null) {
            System.out.print(count++ + ". ");
            crawlingWord(line, level);
          }
        } catch (IOException e) {}
  }

  @Override
  public void insertWord(String word, int level) throws Exception {
    crawlingWord(word,level);
  }

  @Override
  public void getDictionary(String url, String filePath) throws Exception {
    ArrayList<String> wordBook = new ArrayList<>();
    System.setProperty("webdriver.chrome.driver",ChromeDriverUri);
    WebDriver driver = new ChromeDriver();

    driver.get(url);
    Thread.sleep(500);
    WebElement id = driver.findElement(By.cssSelector("#id"));
    WebElement pw = driver.findElement(By.cssSelector("#pw"));
    Authentication(id, naverId);
    Authentication(pw, naverPw);
    pw.sendKeys(Keys.ENTER);

    Thread.sleep(1000);
    WebElement pageElement = driver.findElement(By.cssSelector(".page_num>.total"));
    int page = Integer.parseInt(pageElement.getText());

    for(int i=0; i<page; i++) {
      List<WebElement> words = driver.findElements(By.cssSelector(".cont_word>.title"));
      for (WebElement word : words) {
        String str = word.getText();
        str = str.replace("|","");
        str = str.replace("·","");
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
    // BufferedWriter를 사용하여 파일에 쓰기
    try (BufferedWriter writer = new BufferedWriter(new FileWriter(filePath))) {
      for(String content : wordBook)
        writer.write(content+"\n");
    }catch(Exception e){}
  }

  @Override
  public void insertMusicWord(int musicId) throws Exception {
    StringTokenizer st;
    HashMap<String, Object> param = new HashMap<>();
    List<LyricsDto> lyricList = musicMapper.getMusicDetail(musicId);
    for(LyricsDto lyric : lyricList){
      String line = lyric.getLyric();
      st = new StringTokenizer(line, " ");
      while(st.hasMoreTokens()){
        String word = st.nextToken();
        word = word.toLowerCase();
        if(wordMapper.checkWord(word)==0) crawlingWord(word, 0);
        try {
          int wordId = wordMapper.getWordId(word);
          param.put("musicId", musicId);
          param.put("wordId", wordId);
          try {
            wordMapper.insertWordMusic(param);
          } catch (Exception e) {
            log.info(word + "는 중복된 단어입니다.");
          }
        }catch(Exception e){log.info(word + "에 해당하는 단어는 존재하지 않습니다.");}
      }
    }
  }

  //단어정보를 가져와서 파싱(분석 및 구조화)!!!
  public void crawlingWord(String word, int level) throws Exception {
    if(wordMapper.checkWord(word)==1)   {
      log.warn("{}는 이미 DB에 존재하는 단어입니다.",word);
      return;
    }
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
    }catch(Exception e){}
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
    if(mCount == 0) {
      log.info(word + "에 해당하는 단어는 찾을 수 없습니다.");
      return;
    }
    WordDto wordDto = new WordDto();
    WordMeaningDto[] wordMeaningDto = new WordMeaningDto[mCount];

    wordDto.setWord(word);
    wordDto.setLevel(level);
    wordDto.setPronunciation(pronunciation);
    wordDto.setWordAudioUri(wordAudioUri);
      wordMapper.insertWord(wordDto);
      for(int i=0; i<mCount; i++){
        wordMeaningDto[i] = new WordMeaningDto();
        wordMeaningDto[i].setWord(word);
        wordMeaningDto[i].setMeaning(meaning.get(i));
        if(partOfSpeech.size()<=i)  wordMeaningDto[i].setPartOfSpeech("");
        else wordMeaningDto[i].setPartOfSpeech(partOfSpeech.get(i));
        wordMapper.insertMeaning(wordMeaningDto[i]);
      }
      wordMapper.updateUri();
      log.info("{}와 {}개의 뜻이 DB에 입력되었습니다.",word, mCount);
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

  @Override
  public void insertSentence(String filePath) throws Exception {
    // 메모장 양식
    // 홀수 줄에는 뜻, 짝수 줄에는 문장(영어)로 구성
    int count = 1;
      try (BufferedReader br = new BufferedReader(new FileReader(filePath))) {
        String meaning;
        while ((meaning = br.readLine()) != null) {
          String sentence = br.readLine();
          meaning = meaning.split(" ",2)[1];
          HashMap<String, Object> param = new HashMap<>();
          param.put("sentence", sentence);
          param.put("meaning", meaning);
          insertSentenceDB(param);
          count++;
          if (count % 100 == 0)  System.out.println(count);
        }
      } catch (IOException e) {}
  }

  private void insertSentenceDB(HashMap<String, Object> param) throws Exception {
    sentenceMapper.insertSentence(param);
    sentenceMapper.updateUri();
  }

  @Override
  public List<SentenceDto> getSentenceList() throws Exception {
    return sentenceMapper.getSentenceList();
  }

  @Override
  public void setSentenceType(HashMap<String, Object> param) throws Exception {
    sentenceMapper.setSentenceType(param);
  }

  @Override
  public void insertLyrics() throws Exception {
    List<LyricsDto> lyrics = sentenceMapper.getAllLyrics();
    for(LyricsDto lyric : lyrics){
      System.out.println(lyric);
      sentenceMapper.insertLyrics(lyric);
      sentenceMapper.insertLyricSentence(lyric);
    }
  }
}
