package com.SoftwareArchitectiurePlayGround.SoftwareArchitecturePlayground.simulation;

import com.SoftwareArchitectiurePlayGround.SoftwareArchitecturePlayground.Component.Component;
import com.SoftwareArchitectiurePlayGround.SoftwareArchitecturePlayground.Component.ComponentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SimulationService {

    private final ComponentRepository componentRepository;

    private final SimulationEngine simulationEngine;

    public SimulationService(ComponentRepository componentRepository,
                             SimulationEngine simulationEngine) {

        this.componentRepository = componentRepository;
        this.simulationEngine = simulationEngine;

    }

    public List<SimulationResult> simulateTraffic(
            Long architectureId,
            int users,
            SimulationScenario scenario) {

        List<Component> components =
                componentRepository.findByArchitectureId(architectureId);

        return simulationEngine.runSimulation(
                components,
                users,
                scenario
        );

    }

}