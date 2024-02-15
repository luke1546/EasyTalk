package com.ssafy.easyback.neighbor.model.dto;

import java.util.UUID;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class NeighborDto {
    private String status;
    private Long neighborId;
    private Long userId;
}
