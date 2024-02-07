package com.ssafy.easyback.neighbor.model.mapper;

import com.ssafy.easyback.neighbor.model.dto.NeighborDto;

public interface NeighborMapper {

    void requestNeighbor(NeighborDto neighborDto) throws Exception;

    void receiveNeighbor(NeighborDto neighborDto) throws Exception;

    void beNeighbor(NeighborDto neighborDto) throws Exception;

    void deleteNeighbor(NeighborDto neighborDto) throws Exception;

    void cancelRequest(NeighborDto neighborDto) throws Exception;
}
