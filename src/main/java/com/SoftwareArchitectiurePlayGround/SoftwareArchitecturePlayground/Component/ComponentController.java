package com.SoftwareArchitectiurePlayGround.SoftwareArchitecturePlayground.Component;


import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/components")
public class ComponentController {

    private final ComponentService componentService;

    public ComponentController(ComponentService componentService) {
        this.componentService = componentService;
    }

    @PostMapping
    public Component createComponent(@RequestBody Component component) {
        return componentService.createComponent(component);
    }

    @GetMapping
    public List<Component> getAllComponents() {
        return componentService.getAllComponent();
    }

    @GetMapping("/{id}")
    public Component getComponentById(@PathVariable Long id) {
        return componentService.getComponentById(id);
    }

    @GetMapping("/architecture/{architectureId}")
    public List<Component> getComponentsByArchitectureId(
            @PathVariable Long architectureId) {

        return componentService.getComponentsByArchitectureId(architectureId);
    }

    @DeleteMapping("/{id}")
    public void deleteComponent(@PathVariable Long id) {
        componentService.deleteComponent(id);
    }
}
