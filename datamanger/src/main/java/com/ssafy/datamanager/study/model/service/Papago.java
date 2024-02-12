package com.ssafy.datamanager.study.model.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Value;

public class Papago {
  @Value("$papago.client.id}")
  private static String clientId; //애플리케이션 클라이언트 아이디값";
  @Value("${papago.client.secret}")
  private static String clientSecret;  //애플리케이션 클라이언트 시크릿값";

  public String translate(String text) throws JsonProcessingException {
    BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
    ObjectMapper mapper = new ObjectMapper();
    String apiURL = "https://openapi.naver.com/v1/papago/n2mt";
    Map<String, String> requestHeaders = new HashMap<>();

    requestHeaders.put("X-Naver-Client-Id", "x84siAtbmq5tE0OfHdmZ");
    requestHeaders.put("X-Naver-Client-Secret", "FIOVncWVzQ");
    String responseBody = post(apiURL, requestHeaders, "en", "ko", text);
    JsonNode jsonNode = mapper.readTree(responseBody);
    String result="";
    try {
      result = jsonNode.get("message").get("result").get("translatedText").asText();
    }catch (Exception e){
      System.out.println(jsonNode);}
    return result;
  }

  private static String post(String apiUrl, Map<String, String> requestHeaders, String from, String to, String text){
    HttpURLConnection con = connect(apiUrl);
    String postParams = "source=" + from + "&target=" + to + "&text=" + text; //원본언어: 한국어 (ko) -> 목적언어: 영어 (en)
    try {
      con.setRequestMethod("POST");
      for(Map.Entry<String, String> header :requestHeaders.entrySet()) {
        con.setRequestProperty(header.getKey(), header.getValue());
      }

      con.setDoOutput(true);
      try (DataOutputStream wr = new DataOutputStream(con.getOutputStream())) {
        wr.write(postParams.getBytes());
        wr.flush();
      }

      int responseCode = con.getResponseCode();
      if (responseCode == HttpURLConnection.HTTP_OK) { // 정상 응답
        String response = readBody(con.getInputStream());
//        JSONObject jObject = new JSONObject(response);
//        JSONObject jMessage = jObject.getJSONObject("message");
//        JSONObject jResult = jMessage.getJSONObject("result");
//        String translatedText = jResult.getString("translatedText");
        return response;
      } else {  // 에러 응답
        return readBody(con.getErrorStream());
      }
    } catch (IOException e) {
      throw new RuntimeException("API 요청과 응답 실패", e);
    } finally {
      con.disconnect();
    }
  }

  private static HttpURLConnection connect(String apiUrl){
    try {
      URL url = new URL(apiUrl);
      return (HttpURLConnection)url.openConnection();
    } catch (MalformedURLException e) {
      throw new RuntimeException("API URL이 잘못되었습니다. : " + apiUrl, e);
    } catch (IOException e) {
      throw new RuntimeException("연결이 실패했습니다. : " + apiUrl, e);
    }
  }

  private static String readBody(InputStream body){
    InputStreamReader streamReader = new InputStreamReader(body);

    try (BufferedReader lineReader = new BufferedReader(streamReader)) {
      StringBuilder responseBody = new StringBuilder();

      String line;
      while ((line = lineReader.readLine()) != null) {
        responseBody.append(line);
      }

      return responseBody.toString();
    } catch (IOException e) {
      throw new RuntimeException("API 응답을 읽는데 실패했습니다.", e);
    }
  }


}
