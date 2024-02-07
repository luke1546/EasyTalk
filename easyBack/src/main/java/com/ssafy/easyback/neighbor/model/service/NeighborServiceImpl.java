package com.ssafy.easyback.neighbor.model.service;

import com.ssafy.easyback.neighbor.model.dto.NeighborDto;
import com.ssafy.easyback.neighbor.model.mapper.NeighborMapper;
import com.ssafy.easyback.user.model.dto.ResponseUserDto;
import java.io.File;
import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Objects;
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
        System.out.println(images.length);
        List<String> fileNames = new ArrayList<>();
        for (MultipartFile image : images) {
            String fileName = image.getOriginalFilename();
            fileNames.add(fileName);
            File targetFile = new File("./src/main/resources/" + fileName);
            FileOutputStream fileOutputStream = new FileOutputStream(targetFile);
            fileOutputStream.write(image.getBytes());
            fileOutputStream.close();
        }
        neighborMapper.writeFeed(param);
        int feedId = neighborMapper.getFeedId();
        param.put("feedId", feedId);
        for(int i=0; i<images.length; i++) {
            param.put("index", i+1);
            neighborMapper.insertImageUri(param);
        }
    }
}
