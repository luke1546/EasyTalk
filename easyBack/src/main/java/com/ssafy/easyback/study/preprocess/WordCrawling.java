package com.ssafy.easyback.study.preprocess;

import java.io.BufferedWriter;
import java.io.FileWriter;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

import java.awt.*;
import java.awt.datatransfer.Clipboard;
import java.awt.datatransfer.StringSelection;
import java.awt.event.KeyEvent;
import java.util.ArrayList;
import java.util.List;

public class WordCrawling {
    private final static String FILEPATH = "C:\\Users\\SSAFY\\Desktop\\project\\S10P12B307\\easyBack\\src\\main\\resources\\study\\word\\wordBook";
    private final static String DICTIONARY_URL = "https://learn.dict.naver.com/wordbook/enkodict/#/my/cards?wbId=ed53763c2c61427f9255762290b620b2&qt=0&st=0&name=%E3%85%87&tab=list";
    private final static String LOGIN_URL = "https://nid.naver.com/nidlogin.login?mode=form&url=https://www.naver.com/";
    static WebDriver driver = new ChromeDriver();
    public static void main(String[] args) throws InterruptedException, AWTException {
        System.setProperty("webdriver.chrome.driver", "C:\\SSAFY\\workplaces\\chromedriver.exe");
        String[] urls = {
            "https://learn.dict.naver.com/wordbook/enkodict/#/my/cards?wbId=af41697f805344a485397c1abc6abaf5&qt=0&st=0&name=%EC%A4%911_%EA%B5%90%EA%B3%BC%EC%84%9C%20%EB%8B%A8%EC%96%B4&tab=list",
            "https://learn.dict.naver.com/wordbook/enkodict/#/my/cards?wbId=a17f4bffcb0c47bbbf038a3b757d4d88&qt=0&st=0&name=%EC%A4%912_%EA%B5%90%EA%B3%BC%EC%84%9C%20%EB%8B%A8%EC%96%B4&tab=list",
            "https://learn.dict.naver.com/wordbook/enkodict/#/my/cards?wbId=d7977a4305004c0dbbfbd17aa0e55998&qt=0&st=0&name=%EC%A4%913_%EA%B5%90%EA%B3%BC%EC%84%9C%20%EB%8B%A8%EC%96%B4&tab=list",
            "https://learn.dict.naver.com/wordbook/enkodict/#/my/cards?wbId=b65a0d7d8d0c44be96cd11947480780b&qt=0&st=0&name=%EA%B3%A01_%EA%B5%90%EA%B3%BC%EC%84%9C%20%EB%8B%A8%EC%96%B4&tab=list",
            "https://learn.dict.naver.com/wordbook/enkodict/#/my/cards?wbId=216751e8fa4f4d0dbe5ecfe5caf15975&qt=0&st=0&name=%EA%B3%A02_%EA%B5%90%EA%B3%BC%EC%84%9C%20%EB%8B%A8%EC%96%B4&tab=list",
            "https://learn.dict.naver.com/wordbook/enkodict/#/my/cards?wbId=bc88e710aa9541f78a3ea317f8fab596&qt=0&st=0&name=%EA%B3%A0_3%EB%85%84%EA%B0%84%20%EA%B5%90%EA%B3%BC%EC%84%9C%EC%97%90%20%EB%82%98%EC%98%A4%EB%8A%94%20%EB%8B%A8%EC%96%B4&tab=list",
            "https://learn.dict.naver.com/wordbook/enkodict/#/my/cards?wbId=885d7c42cca54856ac70283c3bbd93e2&qt=0&st=0&name=YBM%20%ED%86%A0%EC%9D%B5%20%EB%8B%A8%EC%96%B4%201%ED%83%84&tab=list",
            "https://learn.dict.naver.com/wordbook/enkodict/#/my/cards?wbId=ed53763c2c61427f9255762290b620b2&qt=0&st=0&name=%E3%85%87&tab=list"
        };
        login(LOGIN_URL);
        for(int i=1; i<urls.length; i++)    크롤링하기(urls[i-1], i);
        driver.quit();
    }

    private static void 크롤링하기(String url, int level) throws InterruptedException, AWTException {
        ArrayList<String> wordBook = new ArrayList<>();
        driver.get(url);

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
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(FILEPATH+level+".txt"))) {
            for(String content : wordBook)
                writer.write(content+"\n");
        }catch(Exception e){}
    }

    private static void login(String LOGIN_URL) throws InterruptedException, AWTException {
        driver.get(LOGIN_URL);
        Thread.sleep(500);
        WebElement id = driver.findElement(By.cssSelector("#id"));
        WebElement pw = driver.findElement(By.cssSelector("#pw"));
        Authentication(id, "luke1546");
        Authentication(pw, "umaru1956*");
        pw.sendKeys(Keys.ENTER);
    }

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
    private static void Authentication(WebElement we, String textToCopy) throws AWTException, InterruptedException {
        we.click();
        copyAndPaste(textToCopy);
        Thread.sleep(500);
    }
}
