package com.SoftwareArchitectiurePlayGround.SoftwareArchitecturePlayground.simulation;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BottleneckResult {

    private String componentName;

    private double loadPercentage;

    private String status;
}