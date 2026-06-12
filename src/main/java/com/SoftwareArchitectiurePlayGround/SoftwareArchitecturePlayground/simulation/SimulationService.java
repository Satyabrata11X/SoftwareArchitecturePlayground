package com.SoftwareArchitectiurePlayGround.SoftwareArchitecturePlayground.simulation;

import com.SoftwareArchitectiurePlayGround.SoftwareArchitecturePlayground.Component.Component;
import com.SoftwareArchitectiurePlayGround.SoftwareArchitecturePlayground.Component.ComponentRepository;
import com.SoftwareArchitectiurePlayGround.SoftwareArchitecturePlayground.Component.ComponentType;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SimulationService {

    private final ComponentRepository componentRepository;

    public SimulationService(ComponentRepository componentRepository) {
        this.componentRepository = componentRepository;
    }

    public List<SimulationResult> simulateTraffic(Long architectureId, int users) {

        List<Component> components =
                componentRepository.findByArchitectureId(architectureId);

        List<SimulationResult> results = new ArrayList<>();

        for (Component component : components) {

            double load = calculateLoad(component.getType(), users);

            String status = getStatus(load);

            SimulationResult result = SimulationResult.builder()
                    .componentName(component.getName())
                    .loadPercentage(load)
                    .status(status)
                    .build();

            results.add(result);
        }

        return results;
    }

    private double calculateLoad(ComponentType type, int users) {

        double load = switch (type) {

            case API_GATEWAY -> users * 0.005;

            case SERVICE -> users * 0.008;

            case DATABASE -> users * 0.01;

            case CACHE -> users * 0.003;

            case QUEUE -> users * 0.004;

            case CLIENT -> users * 0.002;

            case LOAD_BALANCER -> users * 0.004;
        };

        return Math.min(load, 100);
    }

    private String getStatus(double load) {

        if (load <= 40) {
            return "LOW";
        }

        if (load <= 70) {
            return "MEDIUM";
        }

        if (load <= 90) {
            return "HIGH";
        }

        return "CRITICAL";
    }
}