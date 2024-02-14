package com.ssafy.easyback.study.stt;

import com.google.cloud.speech.v1p1beta1.RecognitionAudio;
import com.google.cloud.speech.v1p1beta1.RecognitionConfig;
import com.google.cloud.speech.v1p1beta1.RecognizeResponse;
import com.google.cloud.speech.v1p1beta1.SpeechClient;
import com.google.cloud.speech.v1p1beta1.SpeechRecognitionAlternative;
import com.google.cloud.speech.v1p1beta1.SpeechRecognitionResult;
import com.google.protobuf.ByteString;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

public class SpeechToTextExample {
  public static void main(String[] args) throws Exception {
    // 인증 정보 경로 설정
//    String credentialsPath = "C:\\Users\\SSAFY\\Desktop\\project\\ivory-amphora-413816-49aa378d904a.json";
//
//    // 오디오 파일 경로 설정
//    String audioFilePath = "C:\\Users\\SSAFY\\python\\voice.mp3";
//
//    // 인증 정보 설정
//    System.setProperty("GOOGLE_APPLICATION_CREDENTIALS", credentialsPath);
//
//    try (SpeechClient speechClient = SpeechClient.create()) {
//      // 오디오 파일 읽기
//      Path path = Paths.get(audioFilePath);
//      byte[] audioBytes = Files.readAllBytes(path);
//      ByteString audioData = ByteString.copyFrom(audioBytes);
//
//      // RecognitionConfig 생성
//      RecognitionConfig config = RecognitionConfig.newBuilder()
//          .setEncoding(RecognitionConfig.AudioEncoding.MP3) // 인코딩을 MP3로 변경
//          .setSampleRateHertz(16000) // 필요한 경우 샘플링 레이트를 수정하세요.
//          .setLanguageCode("en-US")
//          .build();
//
//      // RecognitionAudio 생성
//      RecognitionAudio audio = RecognitionAudio.newBuilder()
//          .setContent(audioData)
//          .build();
//
//      // Speech-to-Text 변환 요청
//      RecognizeResponse response = speechClient.recognize(config, audio);
//      List<SpeechRecognitionResult> results = response.getResultsList();
//
//      // 변환 결과 출력
//      for (SpeechRecognitionResult result : results) {
//        List<SpeechRecognitionAlternative> alternatives = result.getAlternativesList();
//        for (SpeechRecognitionAlternative alternative : alternatives) {
//          System.out.println("Transcript: " + alternative.getTranscript());
//        }
//      }
//    }
    String lyric = "dontcrysnowmaninfrontofmeifyoucansuggestmedarlingdontcrysnowmandontlabelmethiswayofwaterbabycantholdmeclosebabyiwantyoutoknowthatimneverleavingcuzthisisnopleasingyouaremyhomemyhomeorshediessocomeonletsgoletsgoblowsarahwhenidofromthesuniloveyoupueblobarrelbeard";
    String original = "Don't cry, snowman, not in front of me\n"
        + "Who'll catch your tears if you can't catch me, darling?\n"
        + "If you can't catch me, darling\n"
        + "Don't cry, snowman, don't leave me this way\n"
        + "A puddle of water can't hold me close, baby\n"
        + "Can't hold me close, baby\n"
        + "I want you to know that I'm never leaving\n"
        + "'Cause I'm Mrs. Snow, 'til death we'll be freezing\n"
        + "Yeah, you are my home, my home for all seasons\n"
        + "So come on, let's go\n"
        + "Let's go below zero and hide from the sun\n"
        + "I love you forever where";
    SpeechToText speechToText = new SpeechToText();
    speechToText.calculateScore(lyric, original);
  }
}
