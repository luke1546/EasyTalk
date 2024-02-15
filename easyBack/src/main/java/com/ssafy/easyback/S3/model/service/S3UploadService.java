package com.ssafy.easyback.S3.model.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class S3UploadService {

  private final AmazonS3 amazonS3;

  @Value("${s3.bucket}")
  private String bucket;

  public String saveFile(MultipartFile multipartFile, String savePathUri) throws IOException {
    ObjectMetadata metadata = new ObjectMetadata();
    metadata.setContentLength(multipartFile.getSize());
    metadata.setContentType(multipartFile.getContentType());

    if (savePathUri.charAt(0) == '/') {
      savePathUri = savePathUri.substring(1);
    }

    amazonS3.putObject(bucket, savePathUri, multipartFile.getInputStream(), metadata);
    return amazonS3.getUrl(bucket, savePathUri).toString();
  }
}