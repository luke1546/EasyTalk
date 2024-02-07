package com.ssafy.easyback.neighbor.controller;

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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RequestMapping("/neighbor")
@RestController
@RequiredArgsConstructor
public class NeighborController {
    private final NeighborService neighborService;
    @PostMapping("")
    public ResponseEntity<String> requestNeighbor(@RequestBody NeighborDto neighborDto, HttpSession session) throws Exception {
        Long userId = (Long) session.getAttribute("userId");
        userId = Long.parseLong("3301009684");    //지우기
        neighborDto.setUserId(userId);
        neighborService.requestNeighbor(neighborDto);
        return ResponseEntity.ok("200");
    }

    @PutMapping("")
    public ResponseEntity<String> receiveNeighbor(@RequestBody NeighborDto neighborDto, HttpSession session) throws Exception {
        Long userId = (Long) session.getAttribute("userId");
        userId = Long.parseLong("3300642563");    //지우기
        neighborDto.setUserId(userId);
        neighborService.receiveNeighbor(neighborDto);
        return ResponseEntity.ok("200");
    }

    @DeleteMapping("")
    public ResponseEntity<String> deleteNeighbor(@ModelAttribute NeighborDto neighborDto, HttpSession session) throws Exception {
        Long userId = (Long) session.getAttribute("userId");
        userId = Long.parseLong("3301009684");    //지우기
        neighborDto.setUserId(userId);
        System.out.println(neighborDto);
        neighborService.deleteNeighbor(neighborDto);
        return ResponseEntity.ok("200");
    }

    @GetMapping("")
    public ResponseEntity<List<ResponseUserDto>> getNeighborList(
        @RequestParam("status") String status,
        @RequestParam(value = "order", defaultValue = "neighborId") String order,
        @RequestParam(value = "sort", defaultValue = "asc") String sort,
        HttpSession session) throws  Exception{
        HashMap<String,Object> param = new HashMap<>();
        Long userId = (Long) session.getAttribute("userId");
        userId = Long.parseLong("3301009684");    //지우기
        param.put("userId", userId);
        param.put("status", status);
        param.put("order", order);
        param.put("sort", sort);
        return ResponseEntity.ok(neighborService.getNeighborList(param));
    }

    @PostMapping("/feed")
    public ResponseEntity<?> writeFeed(@RequestParam("content") String content, @RequestParam("images") MultipartFile[] images, HttpSession session) throws Exception {
        HashMap<String, Object> param = new HashMap<>();
        Long userId = (Long) session.getAttribute("userId");
        userId = Long.parseLong("3301009684");    //지우기
        param.put("content", content);
        param.put("images", images);
        param.put("userId", userId);
        neighborService.writeFeed(param);
        return ResponseEntity.ok(HttpStatus.OK);
    }

}
