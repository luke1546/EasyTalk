package com.ssafy.easyback.neighbor.model.service;

import com.ssafy.easyback.neighbor.model.dto.NeighborDto;

public interface NeighborService {

    void requestNeighbor(NeighborDto neighborDto) throws Exception;

    void receiveNeighbor(NeighborDto neighborDto) throws Exception;

    void deleteNeighbor(NeighborDto neighborDto) throws Exception;
}
