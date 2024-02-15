package com.ssafy.easyback.neighbor.controller;

import com.ssafy.easyback.neighbor.model.dto.CommentDto;
import com.ssafy.easyback.neighbor.model.dto.FeedDto;
import com.ssafy.easyback.neighbor.model.dto.NeighborDto;
import com.ssafy.easyback.neighbor.model.service.NeighborService;
import com.ssafy.easyback.user.model.dto.ResponseUserDto;
import jakarta.servlet.http.HttpSession;
import java.io.File;
import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RequestMapping("/neighbor")
@RestController
@RequiredArgsConstructor
public class NeighborController {
    private final NeighborService neighborService;
    @PostMapping("")    // 이웃 신청
    public ResponseEntity<String> requestNeighbor(@RequestBody NeighborDto neighborDto, HttpSession session) throws Exception {
        Long userId = (Long) session.getAttribute("userId");
        neighborDto.setUserId(userId);
        neighborService.requestNeighbor(neighborDto);
        return ResponseEntity.ok("200");
    }

    @PutMapping("")
    public ResponseEntity<String> receiveNeighbor(@RequestBody NeighborDto neighborDto, HttpSession session) throws Exception {
        Long userId = (Long) session.getAttribute("userId");
        neighborDto.setUserId(userId);
        neighborService.receiveNeighbor(neighborDto);
        return ResponseEntity.ok("200");
    }

    @DeleteMapping("")
    public ResponseEntity<String> deleteNeighbor(@ModelAttribute NeighborDto neighborDto, HttpSession session) throws Exception {
        Long userId = (Long) session.getAttribute("userId");
        neighborDto.setUserId(userId);
        System.out.println(neighborDto);
        neighborService.deleteNeighbor(neighborDto);
        return ResponseEntity.ok("200");
    }

    @GetMapping("")     // 이웃 리스트 보기
    public ResponseEntity<List<ResponseUserDto>> getNeighborList(
        @RequestParam(value = "status", defaultValue = "") String status,
        @RequestParam(value = "order", defaultValue = "neighborId") String order,
        @RequestParam(value = "sort", defaultValue = "asc") String sort,
        @RequestParam(value = "keyword", defaultValue = "") String keyword,
        HttpSession session) throws  Exception{
        HashMap<String,Object> param = new HashMap<>();
        Long userId = (Long) session.getAttribute("userId");
        param.put("userId", userId);
        param.put("status", status);
        param.put("order", order);
        param.put("sort", sort);
        param.put("keyword", keyword);
        return ResponseEntity.ok(neighborService.getNeighborList(param));
    }

    @GetMapping("/status")          //상대방과 나와의 이웃 상태정보
    public ResponseEntity<String> getNeighborStatus(
            @RequestParam("target") Long neighborId,
            HttpSession session) throws  Exception{
        HashMap<String,Object> param = new HashMap<>();
        Long userId = (Long) session.getAttribute("userId");
        param.put("userId", userId);
        param.put("neighborId", neighborId);
        if(userId.equals(neighborId)) return ResponseEntity.ok("MYPROFILE");
        return ResponseEntity.ok(neighborService.getNeighborStatus(param));
    }

    @PostMapping("/feed")       // 피드 작성하기!
    public ResponseEntity<?> writeFeed(@RequestParam("content") String content, @RequestParam(value = "images", required = false) MultipartFile[] images, HttpSession session) throws Exception {
        HashMap<String, Object> param = new HashMap<>();
        Long userId = (Long) session.getAttribute("userId");
        param.put("content", content);
        param.put("images", images);
        param.put("userId", userId);
        neighborService.writeFeed(param);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @PutMapping("feed/{feedId}")        // 피드 수정하기
    public ResponseEntity<?> modifyFeed(
            @PathVariable("feedId") int feedId,
            @RequestParam("content") String content,
            @RequestParam(value = "images", required = false) MultipartFile[] images,
            HttpSession session) throws  Exception {
        HashMap<String, Object> param = new HashMap<>();
        Long userId = (Long) session.getAttribute("userId");
        param.put("userId", userId);
        param.put("feedId", feedId);
        param.put("content", content);
        param.put("images", images);
        neighborService.modifyFeed(param);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @DeleteMapping("feed/{feedId}")
    public ResponseEntity<?> deleteFeed(@PathVariable("feedId") int feedId) throws Exception{
        HashMap<String, Object> param = new HashMap<>();
        param.put("feedId", feedId);
        neighborService.deleteFeed(param);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @GetMapping("/feed")          //피드 리스트 조회
    public ResponseEntity<List<FeedDto>> getFeedList(
            @RequestParam(value = "type", defaultValue = "list") String type,
            @RequestParam(value = "target", required = false) Long neighborId,
            HttpSession session) throws  Exception{
        HashMap<String,Object> param = new HashMap<>();
        Long userId = (Long) session.getAttribute("userId");
        param.put("userId", userId);
        param.put("neighborId", neighborId);
        param.put("type", type);
        return ResponseEntity.ok(neighborService.getFeedList(param));
    }

    @GetMapping("/feed/{feedId}")       // 피드 상세보기
    public ResponseEntity<FeedDto> getFeedDetail(@PathVariable("feedId") int feedId, HttpSession session) throws  Exception {
        HashMap<String, Object> param = new HashMap<>();
        Long userId = (Long) session.getAttribute("userId");
        param.put("userId", userId);
        param.put("feedId", feedId);
        return ResponseEntity.ok(neighborService.getFeedDetail(param));
    }

    @PostMapping("/feed/{feedId}/comment")      // 피드에 댓글 작성하기
    public ResponseEntity<String> writeComment(@PathVariable("feedId") int feedId, @RequestBody HashMap<String, Object> param, HttpSession session) throws  Exception {
        Long userId = (Long) session.getAttribute("userId");
        param.put("userId", userId);
        param.put("feedId", feedId);
        neighborService.writeComment(param);
        return ResponseEntity.ok("200");
    }

    @PutMapping("/feed/comment/{commentId}")      // 피드에 댓글 수정하기
    public ResponseEntity<String> modifyComment(@PathVariable("commentId") int commentId, @RequestBody HashMap<String, Object> param) throws  Exception {
        param.put("commentId", commentId);
        neighborService.modifyComment(param);
        return ResponseEntity.ok("200");
    }

    @DeleteMapping("/feed/comment/{commentId}")      // 피드에 댓글 삭제하기
    public ResponseEntity<String> deleteComment(@PathVariable("commentId") int commentId) throws  Exception {
        HashMap<String, Object> param = new HashMap<>();
        param.put("commentId", commentId);
        neighborService.deleteComment(param);
        return ResponseEntity.ok("200");
    }

    @GetMapping("/feed/{feedId}/comment")       // 피드의 댓글 보기
    public ResponseEntity<Object> getFeedComment(@PathVariable("feedId") int feedId, HttpSession session) throws  Exception {
        HashMap<String, Object> param = new HashMap<>();
        Long userId = (Long) session.getAttribute("userId");
        param.put("userId", userId);
        param.put("feedId", feedId);
        return ResponseEntity.ok(neighborService.getFeedComment(param));
    }
}
