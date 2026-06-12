package com.SoftwareArchitectiurePlayGround.SoftwareArchitecturePlayground.simulation;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/simulation")
public class SimulationController {

    private final SimulationService simulationService;

    public SimulationController(SimulationService simulationService) {
        this.simulationService = simulationService;
    }

    @GetMapping("/traffic")
    public List<SimulationResult> simulateTraffic(
            @RequestParam Long architectureId,
            @RequestParam int users) {

        return simulationService.simulateTraffic(architectureId, users);
    }
}