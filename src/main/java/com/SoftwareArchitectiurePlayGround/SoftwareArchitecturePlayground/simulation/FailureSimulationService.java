package com.SoftwareArchitectiurePlayGround.SoftwareArchitecturePlayground.simulation;

import com.SoftwareArchitectiurePlayGround.SoftwareArchitecturePlayground.Component.Component;
import com.SoftwareArchitectiurePlayGround.SoftwareArchitecturePlayground.Component.ComponentRepository;
import com.SoftwareArchitectiurePlayGround.SoftwareArchitecturePlayground.connection.Connection;
import com.SoftwareArchitectiurePlayGround.SoftwareArchitecturePlayground.connection.ConnectionRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FailureSimulationService {

    private final ComponentRepository componentRepository;
    private final ConnectionRepository connectionRepository;

    public FailureSimulationService(
            ComponentRepository componentRepository,
            ConnectionRepository connectionRepository) {

        this.componentRepository = componentRepository;
        this.connectionRepository = connectionRepository;
    }

    public List<FailureSimulationResult> simulateFailure(Long componentId) {

        List<FailureSimulationResult> results = new ArrayList<>();

        Component failedComponent =
                componentRepository.findById(componentId).orElse(null);

        if (failedComponent == null) {
            return results;
        }

        results.add(
                FailureSimulationResult.builder()
                        .componentName(failedComponent.getName())
                        .status("DOWN")
                        .build()
        );

        List<Connection> connections = connectionRepository.findAll();

        for (Connection connection : connections) {

            if (connection.getTargetComponent().getId().equals(componentId)) {

                results.add(
                        FailureSimulationResult.builder()
                                .componentName(
                                        connection.getSourceComponent().getName()
                                )
                                .status("IMPACTED")
                                .build()
                );
            }
        }

        return results;
    }
}