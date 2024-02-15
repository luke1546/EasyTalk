package com.ssafy.easyback.study.model.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ArtistDto {
  private int artistId;
  private String artistName;
  private String description;
  private String artistImageUri;
}
