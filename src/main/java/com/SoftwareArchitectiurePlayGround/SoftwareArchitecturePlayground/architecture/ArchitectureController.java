package com.SoftwareArchitectiurePlayGround.SoftwareArchitecturePlayground.architecture;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Architecture APIs", description = "Manage software architectures")
@RestController
@RequestMapping("/architectures")
public class ArchitectureController {

    private final ArchitectureService architectureService;

    public ArchitectureController(ArchitectureService architectureService) {
        this.architectureService = architectureService;
    }

    @Operation(summary = "Create a new architecture")
    @PostMapping
    public Architecture createArchitecture(@RequestBody Architecture architecture) {
        return architectureService.createArchitecture(architecture);
    }

    @Operation(summary = "Get all architectures")
    @GetMapping
    public List<Architecture> getAllArchitectures() {
        return architectureService.getAllArchitectures();
    }

    @Operation(summary = "Get architecture by ID")
    @GetMapping("/{id}")
    public Architecture getArchitectureById(@PathVariable Long id) {
        return architectureService.getArchitectureById(id);
    }

    @Operation(summary = "Delete architecture by ID")
    @DeleteMapping("/{id}")
    public void deleteArchitecture(@PathVariable Long id) {
        architectureService.deleteArchitecture(id);
    }
}