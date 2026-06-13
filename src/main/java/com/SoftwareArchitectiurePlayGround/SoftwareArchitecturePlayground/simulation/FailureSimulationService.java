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

        propagateFailure(componentId, results);

        return results;
    }

    private void propagateFailure(
            Long componentId,
            List<FailureSimulationResult> results) {

        List<Connection> dependencies =
                connectionRepository.findByTargetComponentId(componentId);

        for (Connection connection : dependencies) {

            Component impactedComponent =
                    connection.getSourceComponent();

            results.add(
                    FailureSimulationResult.builder()
                            .componentName(impactedComponent.getName())
                            .status("IMPACTED")
                            .build()
            );

            propagateFailure(
                    impactedComponent.getId(),
                    results
            );
        }
    }
}