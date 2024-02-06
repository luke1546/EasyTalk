package com.ssafy.easyback.neighbor.controller;

import com.ssafy.easyback.neighbor.model.dto.NeighborDto;
import com.ssafy.easyback.neighbor.model.service.NeighborService;
import com.ssafy.easyback.user.model.dto.ResponseUserDto;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
        userId = Long.parseLong("3301009684");    //지우기
        neighborDto.setUserId(userId);
        neighborService.receiveNeighbor(neighborDto);
        return ResponseEntity.ok("200");
    }

    @DeleteMapping("")
    public ResponseEntity<String> deleteNeighbor(@ModelAttribute NeighborDto neighborDto, HttpSession session) throws Exception {
        Long userId = (Long) session.getAttribute("userId");
        userId = Long.parseLong("3301009684");    //지우기
        neighborDto.setUserId(userId);
        neighborService.deleteNeighbor(neighborDto);
        return ResponseEntity.ok("200");
    }
}
