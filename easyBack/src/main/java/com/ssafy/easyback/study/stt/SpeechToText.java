package com.ssafy.easyback.study.stt;

import com.google.api.gax.longrunning.OperationFuture;
import com.google.cloud.speech.v1.LongRunningRecognizeMetadata;
import com.google.cloud.speech.v1.LongRunningRecognizeResponse;
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
import java.util.concurrent.ExecutionException;
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

  public int calculateScore(String recognize, String originalText) {   //LCS BJ_9251
    StringBuilder sb = new StringBuilder();
    int score;
    originalText = originalText.replaceAll("[^가-힣a-zA-Z0-9\\s]", "");
    originalText = originalText.replace(" ", "");
    originalText = originalText.replaceAll("\\r\\n|\\r|\\n", "");
    originalText = originalText.toLowerCase();
    recognize = recognize.replaceAll("[^가-힣a-zA-Z0-9\\s]", "");
    recognize = recognize.replace(" ", "");
    recognize = recognize.replaceAll("\\r\\n|\\r|\\n", "");
    recognize = recognize.toLowerCase();
    System.out.println("원문 : " + originalText);
    System.out.println("인식된 문장 : " + recognize);
    int R = originalText.length();
    int C = recognize.length();
    int[][] dp = new int[R + 1][C + 1];

    for (int i = 1; i <= R; i++)
      for (int j = 1; j <= C; j++) {
        if (recognize.charAt(j - 1) == originalText.charAt(i - 1))
          dp[i][j] = dp[i - 1][j - 1] + 1;
        else
          dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        ;
      }
    score = (int) (dp[R][C] / (float) Math.max(R, C) * 100);
    System.out.println("전체 글자 수 : " + Math.max(R, C));
    System.out.println("일치하는 글자 수 : " + dp[R][C]);
    System.out.println("점수 : " + score);

    int i = R, j = C;
    while (i > 0 && j > 0) {
      if (recognize.charAt(j - 1) == originalText.charAt(i - 1)) {
        sb.append(recognize.charAt(j - 1));
        j--;
        i--;
      } else {
        if (dp[i - 1][j] > dp[i][j - 1])
          i--;
        else
          j--;
      }
    }
    System.out.println("일치하는 부분 : " + sb.reverse().toString());
    return score;
  }

  //구글 speechToText Logic
  public AccuracyDto getLongText(MultipartFile audioFile, String sentence) throws IOException, InterruptedException, ExecutionException {
    AccuracyDto accuracyDto = new AccuracyDto();
    // 인증 정보 설정
    System.setProperty("GOOGLE_APPLICATION_CREDENTIALS", credentialsPath);

    // MultipartFile 읽기
    byte[] audioBytes = audioFile.getBytes();
//    System.out.println(audioBytes.length);
    ByteString audioData = ByteString.copyFrom(audioBytes);
//    System.out.println("Data size: " + audioData.size() + " bytes");
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

    System.out.println("audio size: " + audio.getContent().size());

    try (SpeechClient speechClient = SpeechClient.create()) {
      // Speech-to-Text 변환 요청. longRunningRecognizeAsync 메서드를 사용하여 비동기식으로 처리합니다.
      OperationFuture<LongRunningRecognizeResponse, LongRunningRecognizeMetadata> response =
          speechClient.longRunningRecognizeAsync(config, audio);

      // 처리가 완료될 때까지 기다립니다.
      while (!response.isDone()) {
        System.out.println("Waiting for response...");
        Thread.sleep(1000);
      }

      // 변환 결과를 가져옵니다. 결과는 비동기적으로 처리되므로 get 메서드를 사용하여 가져옵니다.
      List<SpeechRecognitionResult> results = response.get().getResultsList();

      // 변환 결과 출력
      int count=1;
      StringBuilder transcript = new StringBuilder();
      for (SpeechRecognitionResult result : results) {
        List<SpeechRecognitionAlternative> alternatives = result.getAlternativesList();
        System.out.println(alternatives.size());
        for (SpeechRecognitionAlternative alternative : alternatives) {
          transcript.append(alternative.getTranscript());
        }
      }

      accuracyDto.setRecognize(transcript.toString());
      accuracyDto.setScore(calculateScore(accuracyDto.getRecognize(), sentence));
      return accuracyDto;
    }
  }

}
