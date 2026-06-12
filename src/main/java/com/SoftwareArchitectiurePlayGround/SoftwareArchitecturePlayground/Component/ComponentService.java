package com.SoftwareArchitectiurePlayGround.SoftwareArchitecturePlayground.Component;


import org.springframework.stereotype.Service;

import java.util.List;

@Service

public class ComponentService {

    private final ComponentRepository componentRepository;

    public ComponentService(ComponentRepository componentRepository) {
        this.componentRepository = componentRepository;
    }

    public Component createComponent(Component component){
        return componentRepository.save(component);
    }

    public List<Component> getAllComponent(){
        return componentRepository.findAll();
    }

    public Component getComponentById(Long id) {
        return componentRepository.findById(id).orElse(null);
    }

    public List<Component> getComponentsByArchitectureId(Long architectureId) {
        return componentRepository.findByArchitectureId(architectureId);
    }

    public void deleteComponent(Long id) {
        componentRepository.deleteById(id);
    }
}
