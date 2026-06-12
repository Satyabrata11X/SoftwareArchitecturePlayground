package com.SoftwareArchitectiurePlayGround.SoftwareArchitecturePlayground.simulation;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SimulationResult {

    private String componentName;

    private double loadPercentage;

    private String status;

}