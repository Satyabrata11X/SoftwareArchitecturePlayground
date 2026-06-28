package com.SoftwareArchitectiurePlayGround.SoftwareArchitecturePlayground.Component;

import com.SoftwareArchitectiurePlayGround.SoftwareArchitecturePlayground.connection.ConnectionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ComponentService {

    private final ComponentRepository componentRepository;
    private final ConnectionRepository connectionRepository;

    public ComponentService(ComponentRepository componentRepository,
                            ConnectionRepository connectionRepository) {

        this.componentRepository = componentRepository;
        this.connectionRepository = connectionRepository;

    }

    // ==========================================
    // Create Component
    // ==========================================

    public Component createComponent(Component component) {

        boolean exists =
                componentRepository.existsByNameIgnoreCaseAndArchitectureId(
                        component.getName(),
                        component.getArchitecture().getId()
                );

        if (exists) {

            throw new RuntimeException(
                    "Component already exists in this architecture."
            );

        }

        return componentRepository.save(component);

    }

    // ==========================================
    // Get All Components
    // ==========================================

    public List<Component> getAllComponent() {

        return componentRepository.findAll();

    }

    // ==========================================
    // Get Component By Id
    // ==========================================

    public Component getComponentById(Long id) {

        return componentRepository.findById(id).orElse(null);

    }

    // ==========================================
    // Get Components By Architecture
    // ==========================================

    public List<Component> getComponentsByArchitectureId(Long architectureId) {

        return componentRepository.findByArchitectureId(architectureId);

    }

    // ==========================================
    // Delete Component
    // ==========================================

    @Transactional
    public void deleteComponent(Long id) {

        // Delete all outgoing connections
        connectionRepository.deleteBySourceComponentId(id);

        // Delete all incoming connections
        connectionRepository.deleteByTargetComponentId(id);

        // Delete component
        componentRepository.deleteById(id);

    }

}