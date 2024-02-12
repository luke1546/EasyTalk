package com.ssafy.easyback.study.stt;

import com.google.cloud.speech.v1.RecognitionAudio;
import com.google.cloud.speech.v1.RecognitionConfig;
import com.google.cloud.speech.v1.RecognizeResponse;
import com.google.cloud.speech.v1.SpeechClient;
import com.google.cloud.speech.v1.SpeechRecognitionAlternative;
import com.google.cloud.speech.v1.SpeechRecognitionResult;
import com.google.protobuf.ByteString;
import com.ssafy.easyback.study.model.dto.AccuracyDto;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class SpeechToText {
  @Value("${clova.client.id}")
  private String clientId; // Application Client ID";
  @Value("${clova.client.secret}")
  private String clientSecret;  // Application Client Secret";
  @Value("${gstt.credentials.uri}")
  String credentialsPath;

  public AccuracyDto getAccuracy(MultipartFile audioFile, String sentence) throws Exception {    //정확성 측정(clova)

    AccuracyDto accuracyDto = new AccuracyDto();
    try {
      String language = "Eng";        // 언어 코드 ( Kor, Jpn, Eng, Chn )
      String apiURL = "https://naveropenapi.apigw.ntruss.com/recog/v1/stt?lang=" + language;
      URL url = new URL(apiURL);

      HttpURLConnection conn = (HttpURLConnection)url.openConnection();
      conn.setUseCaches(false);
      conn.setDoOutput(true);
      conn.setDoInput(true);
      conn.setRequestProperty("Content-Type", "application/octet-stream");
      conn.setRequestProperty("X-NCP-APIGW-API-KEY-ID", clientId);
      conn.setRequestProperty("X-NCP-APIGW-API-KEY", clientSecret);

//      OutputStream outputStream = conn.getOutputStream();
//      FileInputStream inputStream = new FileInputStream(voiceFile);
//      byte[] buffer = new byte[4096];
//      int bytesRead = -1;
//      while ((bytesRead = inputStream.read(buffer)) != -1) {
//        outputStream.write(buffer, 0, bytesRead);
//      }
//      outputStream.flush();
//      inputStream.close();
      OutputStream outputStream = conn.getOutputStream();
      InputStream inputStream = audioFile.getInputStream();
      byte[] buffer = new byte[4096];
      int bytesRead = -1;
      while ((bytesRead = inputStream.read(buffer)) != -1) {
        outputStream.write(buffer, 0, bytesRead);
      }
      outputStream.flush();
      inputStream.close();

      BufferedReader br = null;
      int responseCode = conn.getResponseCode();
      if(responseCode == 200) { // 정상 호출
        br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
      } else {  // 오류 발생
        System.out.println("error!!!!!!! responseCode= " + responseCode);
        br = new BufferedReader(new InputStreamReader(conn.getInputStream()));
      }
      String inputLine;

      if(br != null) {
        StringBuffer response = new StringBuffer();
        while ((inputLine = br.readLine()) != null) {
          response.append(inputLine);
        }
        br.close();
        System.out.println(response.toString());
        accuracyDto.setRecognize(response.toString());
      } else {
        System.out.println("error !!!");
      }
    } catch (Exception e) {
      System.out.println(e);
    }
    accuracyDto.setScore(calculateScore(accuracyDto.getRecognize(), sentence));
    return accuracyDto;
  }

  private int calculateScore(String recognize, String originalText) {   //LCS BJ_9251
    StringBuilder sb = new StringBuilder();
    int score;
    originalText = originalText.replaceAll("[^가-힣a-zA-Z0-9\\s]", "");
    originalText = originalText.replace(" ", "");
    recognize = recognize.replaceAll("[^가-힣a-zA-Z0-9\\s]", "");
    recognize = recognize.replace(" ", "");
    System.out.println("원문 : " + originalText);
    System.out.println("인식된 문장 : " + recognize);
    int R = originalText.length();
    int C = recognize.length();
    int[][] dp = new int[R+1][C+1];

    for(int i=1; i<=R; i++) for(int j=1; j<=C; j++){
      if(recognize.charAt(j-1) == originalText.charAt(i-1))    dp[i][j] = dp[i-1][j-1]+1;
      else dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);;
    }
    score = (int)(dp[R][C]/(float)Math.max(R,C)*100);
    System.out.println("전체 글자 수 : " + Math.max(R,C));
    System.out.println("일치하는 글자 수 : " + dp[R][C]);
    System.out.println("점수 : " + score);

    int i=R, j=C;
    while(i > 0 && j>0){
      if(recognize.charAt(j-1) == originalText.charAt(i-1)){
        sb.append(recognize.charAt(j-1));
        j--;
        i--;
      }else{
        if(dp[i-1][j] > dp[i][j-1]) i--;
        else j--;
      }
    }
    System.out.println("일치하는 부분 : " + sb.reverse().toString());
    return score;
  }

  public AccuracyDto getText(MultipartFile audioFile, String sentence) throws IOException {   //음성인식
    AccuracyDto accuracyDto = new AccuracyDto();
    sentence = sentence.toLowerCase();

    // 인증 정보 설정
    System.setProperty("GOOGLE_APPLICATION_CREDENTIALS", credentialsPath);

    // MultipartFile 읽기
    byte[] audioBytes = audioFile.getBytes();
    ByteString audioData = ByteString.copyFrom(audioBytes);

    // RecognitionConfig 생성
    RecognitionConfig config = RecognitionConfig.newBuilder()
        .setEncoding(RecognitionConfig.AudioEncoding.MP3) // 인코딩을 MP3로 변경
        .setSampleRateHertz(16000) // 필요한 경우 샘플링 레이트를 수정하세요.
        .setLanguageCode("en-US")
        .build();

    // RecognitionAudio 생성
    RecognitionAudio audio = RecognitionAudio.newBuilder()
        .setContent(audioData)
        .build();

    try (SpeechClient speechClient = SpeechClient.create()) {
      // Speech-to-Text 변환 요청
      RecognizeResponse response = speechClient.recognize(config, audio);
      List<SpeechRecognitionResult> results = response.getResultsList();

      // 변환 결과 출력
      StringBuilder transcript = new StringBuilder();
      for (SpeechRecognitionResult result : results) {
        List<SpeechRecognitionAlternative> alternatives = result.getAlternativesList();
        for (SpeechRecognitionAlternative alternative : alternatives) {
          transcript.append(alternative.getTranscript());
        }
      }

      accuracyDto.setRecognize(transcript.toString().toLowerCase());
      accuracyDto.setScore(calculateScore(accuracyDto.getRecognize(), sentence));
      return accuracyDto;
    }
  }
}
