package com.ssafy.easyback.neighbor.model.service;

import com.ssafy.easyback.neighbor.model.dto.NeighborDto;
import com.ssafy.easyback.neighbor.model.mapper.NeighborMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;

@Service
@RequiredArgsConstructor
@Transactional
public class NeighborServiceImpl implements NeighborService{
    private final NeighborMapper neighborMapper;

    @Override
    public void requestNeighbor(NeighborDto neighborDto) throws Exception {
        neighborMapper.requestNeighbor(neighborDto);
    }
    @Override
    public void receiveNeighbor(NeighborDto neighborDto) throws Exception {
        neighborMapper.receiveNeighbor(neighborDto);
        neighborMapper.beNeighbor(neighborDto);
    }

    @Override
    public void deleteNeighbor(NeighborDto neighborDto) throws Exception {
        if(neighborDto.getStatus().equals("NEIGHBOR"))  neighborMapper.deleteNeighbor(neighborDto);
        else neighborMapper.cancelRequest(neighborDto);
    }
}
