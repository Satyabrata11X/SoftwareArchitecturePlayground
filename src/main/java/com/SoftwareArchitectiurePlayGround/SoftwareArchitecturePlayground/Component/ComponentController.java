package com.SoftwareArchitectiurePlayGround.SoftwareArchitecturePlayground.Component;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/components")
public class ComponentController {

    private final ComponentService componentService;

    public ComponentController(ComponentService componentService) {
        this.componentService = componentService;
    }

    // ==========================================
    // Create Component
    // ==========================================

    @PostMapping
    public ResponseEntity<?> createComponent(@RequestBody Component component) {

        try {

            Component savedComponent =
                    componentService.createComponent(component);

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(savedComponent);

        }

        catch (RuntimeException exception) {

            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(exception.getMessage());

        }

    }

    // ==========================================
    // Get All Components
    // ==========================================

    @GetMapping
    public List<Component> getAllComponents() {

        return componentService.getAllComponent();

    }

    // ==========================================
    // Get Component By Id
    // ==========================================

    @GetMapping("/{id}")
    public Component getComponentById(@PathVariable Long id) {

        return componentService.getComponentById(id);

    }

    // ==========================================
    // Get Components By Architecture
    // ==========================================

    @GetMapping("/architecture/{architectureId}")
    public List<Component> getComponentsByArchitectureId(
            @PathVariable Long architectureId) {

        return componentService
                .getComponentsByArchitectureId(architectureId);

    }

    // ==========================================
    // Delete Component
    // ==========================================

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteComponent(
            @PathVariable Long id) {

        componentService.deleteComponent(id);

        return ResponseEntity.ok("Component deleted successfully.");

    }

}