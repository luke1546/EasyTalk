package com.ssafy.datamanager.study.model.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.ssafy.datamanager.study.model.dto.ArtistDto;
import com.ssafy.datamanager.study.model.dto.LyricsDto;
import com.ssafy.datamanager.study.model.dto.MusicDto;
import com.ssafy.datamanager.study.model.mapper.MusicMapper;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpRequest.BodyPublishers;
import java.net.http.HttpResponse;
import java.net.http.HttpResponse.BodyHandlers;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class MusicServiceImpl implements MusicService{
  private final MusicMapper musicMapper;
  @Value("${youtube.key}")
  private String youtubeKey;
  @Override
  public void insertMusic(String artistName, String videoId) throws Exception {
    MusicDto musicDto = new MusicDto();
    int artistId = musicMapper.getArtistId(artistName);
    HttpClient client = HttpClient.newHttpClient();
    HttpRequest request = HttpRequest.newBuilder()
        .uri(new URI("https://youtube.googleapis.com/youtube/v3/videos?part=snippet&part=contentDetails&id="+ videoId +"&key="+youtubeKey))
        .build();
    HttpResponse<String> response = client.send(request, BodyHandlers.ofString());
    ObjectMapper mapper = new ObjectMapper();
    JsonNode jsonNode = mapper.readTree(response.body());
    String title = jsonNode.get("items").get(0).get("snippet").get("title").asText();
    String duration = jsonNode.get("items").get(0).get("contentDetails").get("duration").asText();
    duration = duration.replace("PT", "");
    duration = duration.replace("S", "");
    String[] time = duration.split("M");
    int musicTime = Integer.parseInt(time[0])*60 + Integer.parseInt(time[1]);

    String musicImgUri = "https://img.youtube.com/vi/"+ videoId +"/maxresdefault.jpg";
    String base64String = Base64.getEncoder().encodeToString(("\n\u000B" +videoId).getBytes(
        StandardCharsets.UTF_8));
    JSONObject body = new JSONObject();
    body.put("context", new JSONObject().put("client", new JSONObject().put("clientName", "WEB").put("clientVersion", "2.9999099")));
    body.put("params", base64String);
    request = HttpRequest.newBuilder()
        .uri(new URI("https://www.youtube.com/youtubei/v1/get_transcript?key=AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8"))
        .header("Content-Type", "application/json")
        .POST(BodyPublishers.ofString(body.toString()))
        .build();
    response = client.send(request, BodyHandlers.ofString());  //동영상 자막 가져오기 youtube v1


    JsonNode responseData = mapper.readTree(response.body());
    JsonNode cueGroups = responseData.path("actions").get(0).path("updateEngagementPanelAction").path("content").path("transcriptRenderer").path("body").path("transcriptBodyRenderer").path("cueGroups");
    ArrayNode resultData = mapper.createArrayNode();

    for (JsonNode cueGroupNode : cueGroups) {
      JsonNode cues = cueGroupNode.path("transcriptCueGroupRenderer").path("cues").get(0).path("transcriptCueRenderer");

      String caption = cues.path("cue").path("simpleText").asText();
      String startOffsetMs = cues.path("startOffsetMs").asText();
      String durationMs = cues.path("durationMs").asText();

      ObjectNode resultItem = mapper.createObjectNode();
      resultItem.put("caption", caption);
      resultItem.put("startOffsetMs", startOffsetMs);
      resultItem.put("durationMs", durationMs);

      resultData.add(resultItem);
    }
    musicDto.setArtistId(artistId);
    musicDto.setVideoId(videoId);
    musicDto.setMusicTime(musicTime);
    musicDto.setTitle(title);
    musicDto.setMusicImageUri(musicImgUri);
    musicMapper.insertMusic(musicDto);
    HashMap<String, Object> param = new HashMap<>();
    Papago papago = new Papago();
    int musicId = musicMapper.getMusicId(videoId);
    System.out.println(musicId);
    System.out.println(resultData);
    for(JsonNode jn : resultData) {
      String lyric = jn.get("caption").asText();
      int startOffsetMs = jn.get("startOffsetMs").asInt();
      int durationMs = jn.get("durationMs").asInt();
      lyric = lyric.replaceAll("[^ㄱ-ㅎ가-힣a-zA-Z0-9 \n']","").trim();
      lyric = lyric.replace("\n", " ");
      lyric = lyric.replace("  ", " ");
      System.out.println(lyric);
      String meaning = papago.translate(lyric);
      param.put("lyric", lyric);
      param.put("meaning", meaning);
      param.put("startOffsetMs", startOffsetMs);
      param.put("durationMs", durationMs);
      param.put("musicId", musicId);
      musicMapper.insertLyric(param);
      musicMapper.insertLyricAudioUri();
    }
  }
  @Override
  public void insertArtist(ArtistDto artistDto) throws Exception {
    musicMapper.insertArtist(artistDto);
  }
  @Override
  public List<MusicDto> getMusicList() throws Exception {
    return musicMapper.getMusicList();
  }
  @Override
  public List<LyricsDto> getMusicDetail(int musicId) throws Exception{
    return musicMapper.getMusicDetail(musicId);
  }
  @Override
  public void deleteLyric(int lyricId) throws Exception {
    musicMapper.deleteLyric(lyricId);
  }

  @Override
  public void updateLyric(HashMap<String, Object> param) throws Exception {
    musicMapper.updateLyric(param);
  }
}
