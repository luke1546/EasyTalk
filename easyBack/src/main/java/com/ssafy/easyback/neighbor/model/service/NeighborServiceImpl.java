package com.ssafy.easyback.neighbor.model.service;

import com.ssafy.easyback.S3.model.service.S3UploadService;
import com.ssafy.easyback.config.PathUri;
import com.ssafy.easyback.neighbor.model.dto.CommentDto;
import com.ssafy.easyback.neighbor.model.dto.FeedDto;
import com.ssafy.easyback.neighbor.model.dto.NeighborDto;
import com.ssafy.easyback.neighbor.model.mapper.NeighborMapper;
import com.ssafy.easyback.user.model.dto.ResponseUserDto;
import java.io.File;
import java.io.FileOutputStream;
import java.util.*;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
@Transactional
public class NeighborServiceImpl implements NeighborService{
    private final NeighborMapper neighborMapper;
    private final S3UploadService s3UploadService;

    @Override
    public void requestNeighbor(NeighborDto neighborDto) throws Exception {
        neighborMapper.requestNeighbor(neighborDto);
    }
    @Override
    public void receiveNeighbor(NeighborDto neighborDto) throws Exception {
        neighborMapper.receiveNeighbor(neighborDto);
    }

    @Override
    public void deleteNeighbor(NeighborDto neighborDto) throws Exception {
        neighborMapper.deleteNeighbor(neighborDto);
    }

    @Override
    public List<ResponseUserDto> getNeighborList(HashMap<String, Object> param) throws Exception {
        return neighborMapper.getNeighborList(param);
    }

    @Override
    public void writeFeed(HashMap<String, Object> param) throws Exception {
        MultipartFile[] images = (MultipartFile[]) param.get("images");
        neighborMapper.writeFeed(param);
        if(images != null) {
            int feedId = neighborMapper.getFeedId();
            param.put("feedId", feedId);
            for (MultipartFile image : images) {

                String fileName = image.getOriginalFilename();
                String extension = fileName.substring(fileName.lastIndexOf("."));  // 확장자 추출
                String newFilename = PathUri.FEED_IMAGE_URI + UUID.randomUUID().toString() + extension;  // UUID와 확장자를 조합하여 새로운 파일 이름 생성
                s3UploadService.saveFile(image, newFilename);
                param.put("UUID", newFilename);
                neighborMapper.insertImageUri(param);
            }
        }
    }

    @Override
    public void modifyFeed(HashMap<String, Object> param) throws Exception {
        MultipartFile[] images = (MultipartFile[]) param.get("images");
        neighborMapper.modifyFeed(param);
        if(images != null) {
            for (MultipartFile image : images) {
                String fileName = image.getOriginalFilename();
                String extension = fileName.substring(fileName.lastIndexOf("."));  // 확장자 추출
                String newFilename = PathUri.FEED_IMAGE_URI + UUID.randomUUID().toString() + extension;  // UUID와 확장자를 조합하여 새로운 파일 이름 생성
                s3UploadService.saveFile(image, newFilename);
                param.put("UUID", newFilename);
                neighborMapper.insertImageUri(param);
            }
        }
    }

    @Override
    public void deleteFeed(HashMap<String, Object> param) throws Exception {
        neighborMapper.deleteFeed(param);
    }

    @Override
    public String getNeighborStatus(HashMap<String, Object> param) throws Exception {
        String status = neighborMapper.getNeighborStatus(param);
        if(status == null) status = "NOTNEIGHBOR";
        return status;
    }

    @Override
    public List<FeedDto> getFeedList(HashMap<String, Object> param) throws Exception {
        List<FeedDto> feedList = neighborMapper.getFeedList(param);
        for(FeedDto feedDto : feedList){
            int feedId = feedDto.getFeedId();
            List<String> imageUris = neighborMapper.getFeedImages(feedId);
            feedDto.setFeedImageUris(imageUris);
        }
        return feedList;
    }

    @Override
    public FeedDto getFeedDetail(HashMap<String, Object> param) throws Exception {
        FeedDto feedDto = neighborMapper.getFeedDetail(param);
        int feedId = feedDto.getFeedId();
        List<String> imageUris = neighborMapper.getFeedImages(feedId);
        feedDto.setFeedImageUris(imageUris);
        return feedDto;
    }

    @Override
    public void writeComment(HashMap<String, Object> param) throws Exception {
        neighborMapper.writeComment(param);
    }

    @Override
    public List<CommentDto> getFeedComment(HashMap<String, Object> param) throws Exception {
        return neighborMapper.getFeedComment(param);
    }

    @Override
    public void modifyComment(HashMap<String, Object> param) throws Exception {
        neighborMapper.modifyComment(param);
    }

    @Override
    public void deleteComment(HashMap<String, Object> param) throws Exception {
        neighborMapper.deleteComment(param);
    }
}