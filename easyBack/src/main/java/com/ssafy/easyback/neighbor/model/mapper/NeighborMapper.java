package com.ssafy.easyback.neighbor.model.mapper;

import com.ssafy.easyback.neighbor.model.dto.CommentDto;
import com.ssafy.easyback.neighbor.model.dto.FeedDto;
import com.ssafy.easyback.neighbor.model.dto.NeighborDto;
import com.ssafy.easyback.user.model.dto.ResponseUserDto;
import java.util.HashMap;
import java.util.List;
import java.util.Objects;

public interface NeighborMapper {

    void requestNeighbor(NeighborDto neighborDto) throws Exception;

    void receiveNeighbor(NeighborDto neighborDto) throws Exception;

    void beNeighbor(NeighborDto neighborDto) throws Exception;

    void deleteNeighbor(NeighborDto neighborDto) throws Exception;

    List<ResponseUserDto> getNeighborList(HashMap<String, Object> param) throws Exception;

    void writeFeed(HashMap<String, Object> param) throws Exception;

    void insertImageUri(HashMap<String, Object> param) throws Exception;

    int getFeedId() throws Exception;

    String getNeighborStatus(HashMap<String, Object> param) throws Exception;

    List<FeedDto> getFeedList(HashMap<String, Object> param) throws Exception;

    List<String> getFeedImages(int feedId) throws Exception;

    FeedDto getFeedDetail(HashMap<String, Object> param) throws Exception;

    List<CommentDto> getFeedComment(HashMap<String, Object> param) throws Exception;

    void writeComment(HashMap<String, Object> param) throws Exception;

    void modifyFeed(HashMap<String, Object> param) throws Exception;

    void deleteFeed(HashMap<String, Object> param) throws Exception;

    void modifyComment(HashMap<String, Object> param) throws Exception;

    void deleteComment(HashMap<String, Object> param) throws Exception;
}
