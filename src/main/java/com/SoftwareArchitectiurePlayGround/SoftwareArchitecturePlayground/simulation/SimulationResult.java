package com.SoftwareArchitectiurePlayGround.SoftwareArchitecturePlayground.simulation;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SimulationResult {

    // Component Information
    private String componentName;

    private String componentType;

    // Performance

    private double loadPercentage;

    private int requestsPerSecond;

    private int latency;

    private int responseTime;

    // Health

    private int healthScore;

    private String status;

}