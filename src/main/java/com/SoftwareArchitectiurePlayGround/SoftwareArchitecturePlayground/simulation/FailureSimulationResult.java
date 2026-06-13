package com.SoftwareArchitectiurePlayGround.SoftwareArchitecturePlayground.simulation;


import jakarta.persistence.Entity;
import lombok.*;


@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class FailureSimulationResult {

    private String componentName;

    private String status;
}
