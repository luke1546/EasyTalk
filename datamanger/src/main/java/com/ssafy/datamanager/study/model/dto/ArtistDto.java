package com.ssafy.datamanager.study.model.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ArtistDto {
    private int artistId;
    private String artistName;
    private String artistImageUri;
}
