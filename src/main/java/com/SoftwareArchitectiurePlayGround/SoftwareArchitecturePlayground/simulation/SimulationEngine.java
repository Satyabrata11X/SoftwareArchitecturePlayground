package com.SoftwareArchitectiurePlayGround.SoftwareArchitecturePlayground.simulation;

import com.SoftwareArchitectiurePlayGround.SoftwareArchitecturePlayground.Component.Component;
import com.SoftwareArchitectiurePlayGround.SoftwareArchitecturePlayground.Component.ComponentType;
import org.springframework.stereotype.Service;


import java.util.ArrayList;
import java.util.List;

@Service
public class SimulationEngine {

    public List<SimulationResult> runSimulation(

            List<Component> components,

            int users ,

            SimulationScenario scenario

    ) {

        List<SimulationResult> results =
                new ArrayList<>();

        for (Component component : components) {

            double load =
                    calculateLoad(component.getType(), users);

            int latency =
                    calculateLatency(component.getType(), load);

            int responseTime =
                    calculateResponseTime(latency);

            int requestsPerSecond =
                    calculateRequests(users, load);

            int healthScore =
                    calculateHealth(load);

            String status =
                    calculateStatus(load);

            results.add(

                    SimulationResult.builder()

                            .componentName(component.getName())

                            .componentType(component.getType().name())

                            .loadPercentage(load)

                            .latency(latency)

                            .responseTime(responseTime)

                            .requestsPerSecond(requestsPerSecond)

                            .healthScore(healthScore)

                            .status(status)

                            .build()

            );

        }

        return results;

    }

    // ==========================================
    // Load
    // ==========================================

    private double calculateLoad(ComponentType type, int users) {

        double multiplier = switch (type) {

            case CLIENT -> 0.002;

            case LOAD_BALANCER -> 0.004;

            case API_GATEWAY -> 0.005;

            case SERVICE -> 0.007;

            case DATABASE -> 0.010;

            case CACHE -> 0.003;

            case QUEUE -> 0.004;

        };

        return Math.min(users * multiplier, 100);

    }

    // ==========================================
    // Latency
    // ==========================================

    private int calculateLatency(ComponentType type, double load) {

        int base = switch (type) {

            case CLIENT -> 5;

            case LOAD_BALANCER -> 10;

            case API_GATEWAY -> 20;

            case SERVICE -> 30;

            case DATABASE -> 40;

            case CACHE -> 8;

            case QUEUE -> 15;

        };

        return base + (int) (load * 0.5);

    }

    // ==========================================
    // Response Time
    // ==========================================

    private int calculateResponseTime(int latency) {

        return latency + 5;

    }

    // ==========================================
    // Requests
    // ==========================================

    private int calculateRequests(int users, double load) {

        return (int) (users * (load / 100));

    }

    // ==========================================
    // Health
    // ==========================================

    private int calculateHealth(double load) {

        return Math.max(0, 100 - (int) load);

    }

    // ==========================================
    // Status
    // ==========================================

    private String calculateStatus(double load) {

        if (load <= 40)
            return "LOW";

        if (load <= 70)
            return "MEDIUM";

        if (load <= 90)
            return "HIGH";

        return "CRITICAL";

    }

}