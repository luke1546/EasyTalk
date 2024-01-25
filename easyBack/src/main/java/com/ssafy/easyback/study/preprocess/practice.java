package com.ssafy.easyback.study.preprocess;

import org.checkerframework.checker.units.qual.A;
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

//import java.awt.*;
import java.awt.*;
import java.awt.datatransfer.Clipboard;
import java.awt.datatransfer.StringSelection;
//import java.awt.event.KeyEvent;
import java.awt.event.KeyEvent;
import java.util.ArrayList;
import java.util.List;

public class practice {
    public static void main(String[] args) throws InterruptedException, AWTException {
        ArrayList<String> wordBook = new ArrayList<>();
        System.setProperty("webdriver.chrome.driver", "C:\\SSAFY\\workspaces/chromedriver.exe");
        WebDriver driver = new ChromeDriver();
        String url = "https://learn.dict.naver.com/wordbook/enkodict/#/my/cards?wbId=5392e185d80b4382b9a694473e8f06d6&qt=0&st=0&name=2019%EB%85%84%EC%97%90%20%EB%A7%8E%EC%9D%B4%20%EA%B2%80%EC%83%89%ED%95%9C%20%EB%8B%A8%EC%96%B4%20200&tab=list";

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
