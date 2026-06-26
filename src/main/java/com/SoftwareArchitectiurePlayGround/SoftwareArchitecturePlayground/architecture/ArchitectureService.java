package com.SoftwareArchitectiurePlayGround.SoftwareArchitecturePlayground.architecture;

import com.SoftwareArchitectiurePlayGround.SoftwareArchitecturePlayground.Component.Component;
import com.SoftwareArchitectiurePlayGround.SoftwareArchitecturePlayground.Component.ComponentRepository;
import com.SoftwareArchitectiurePlayGround.SoftwareArchitecturePlayground.connection.ConnectionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ArchitectureService {

    private final ArchitectureRepository architectureRepository;
    private final ComponentRepository componentRepository;
    private final ConnectionRepository connectionRepository;

    public ArchitectureService(
            ArchitectureRepository architectureRepository,
            ComponentRepository componentRepository,
            ConnectionRepository connectionRepository) {

        this.architectureRepository = architectureRepository;
        this.componentRepository = componentRepository;
        this.connectionRepository = connectionRepository;
    }

    public Architecture createArchitecture(Architecture architecture) {
        return architectureRepository.save(architecture);
    }

    public List<Architecture> getAllArchitectures() {
        return architectureRepository.findAll();
    }

    public Architecture getArchitectureById(Long id) {
        return architectureRepository.findById(id).orElse(null);
    }

    @Transactional
    public void deleteArchitecture(Long id) {

        List<Component> components =
                componentRepository.findByArchitectureId(id);

        for (Component component : components) {

            connectionRepository.deleteBySourceComponentId(component.getId());

            connectionRepository.deleteByTargetComponentId(component.getId());

        }

        componentRepository.deleteByArchitectureId(id);

        architectureRepository.deleteById(id);
    }
}