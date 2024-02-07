package com.ssafy.easyback.neighbor.model.mapper;

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

    void cancelRequest(NeighborDto neighborDto) throws Exception;

    List<ResponseUserDto> getNeighborList(HashMap<String, Object> param) throws Exception;

    void writeFeed(HashMap<String, Object> param) throws Exception;

    void insertImageUri(HashMap<String, Object> param) throws Exception;

    int getFeedId() throws Exception;
}
