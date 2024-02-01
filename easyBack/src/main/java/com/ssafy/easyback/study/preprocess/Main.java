package com.ssafy.easyback.study.preprocess;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpHeaders;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import org.json.JSONArray;
import org.json.JSONObject;

public class Main {
  public static void main(String[] args) throws Exception {
    String videoId = "gset79KMmt0"; // YouTube video ID
    String base64String = Base64.getEncoder().encodeToString(("\n\u000B" +videoId).getBytes(StandardCharsets.UTF_8));

    JSONObject body = new JSONObject();
    body.put("context", new JSONObject().put("client", new JSONObject().put("clientName", "WEB").put("clientVersion", "2.9999099")));
    body.put("params", base64String);
    HttpRequest request = HttpRequest.newBuilder()
        .uri(new URI("https://www.youtube.com/youtubei/v1/get_transcript?key=AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8"))
        .header("Content-Type", "application/json")
        .POST(HttpRequest.BodyPublishers.ofString(body.toString()))
        .build();

    HttpClient client = HttpClient.newHttpClient();

    HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

    JSONObject responseData = new JSONObject(response.body());
    JSONArray cueGroups = responseData.getJSONArray("actions").getJSONObject(0).getJSONObject("updateEngagementPanelAction").getJSONObject("content").getJSONObject("transcriptRenderer").getJSONObject("body").getJSONObject("transcriptBodyRenderer").getJSONArray("cueGroups");

    JSONArray resultData = new JSONArray();
    for (int i = 0; i < cueGroups.length(); i++) {
      JSONObject cues = cueGroups.getJSONObject(i).getJSONObject("transcriptCueGroupRenderer").getJSONArray("cues").getJSONObject(0).getJSONObject("transcriptCueRenderer");

      String caption = cues.getJSONObject("cue").getString("simpleText");
      String startOffsetMs = cues.getString("startOffsetMs");
      String durationMs = cues.getString("durationMs");

      JSONObject resultItem = new JSONObject();
      resultItem.put("caption", caption);
      resultItem.put("startOffsetMs", startOffsetMs);
      resultItem.put("durationMs", durationMs);

      resultData.put(resultItem);
    }
    for(int i=0; i<resultData.length(); i++)
    System.out.println(resultData.getJSONObject(i).getString("caption"));
  }
}
