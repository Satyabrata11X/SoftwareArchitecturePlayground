package com.SoftwareArchitectiurePlayGround.SoftwareArchitecturePlayground.simulation;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BottleneckService {

    private final SimulationService simulationService;

    public BottleneckService(SimulationService simulationService) {
        this.simulationService = simulationService;
    }

    public BottleneckResult findBottleneck(
            Long architectureId,
            int users) {

        List<SimulationResult> results =
                simulationService.simulateTraffic(
                        architectureId,
                        users
                );

        SimulationResult bottleneck = null;

        for (SimulationResult result : results) {

            if (bottleneck == null ||
                    result.getLoadPercentage() >
                            bottleneck.getLoadPercentage()) {

                bottleneck = result;
            }
        }

        if (bottleneck == null) {
            return null;
        }

        return BottleneckResult.builder()
                .componentName(
                        bottleneck.getComponentName()
                )
                .loadPercentage(
                        bottleneck.getLoadPercentage()
                )
                .status(
                        bottleneck.getStatus()
                )
                .build();
    }
}