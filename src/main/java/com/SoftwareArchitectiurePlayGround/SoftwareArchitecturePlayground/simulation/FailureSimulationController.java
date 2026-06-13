package com.SoftwareArchitectiurePlayGround.SoftwareArchitecturePlayground.simulation;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/failure")
public class FailureSimulationController {

    private final FailureSimulationService failureSimulationService;

    public FailureSimulationController(
            FailureSimulationService failureSimulationService) {

        this.failureSimulationService = failureSimulationService;
    }

    @GetMapping
    public List<FailureSimulationResult> simulateFailure(
            @RequestParam Long componentId) {

        return failureSimulationService.simulateFailure(componentId);
    }
}