package com.SoftwareArchitectiurePlayGround.SoftwareArchitecturePlayground.architecture;


import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/architectures")

public class ArchitectureController {

    private final ArchitectureService architectureService;

    public ArchitectureController(ArchitectureService architectureService) {
        this.architectureService = architectureService;
    }

    @PostMapping
    public Architecture createArchitecture(@RequestBody Architecture architecture){
        return architectureService.createArchitecture(architecture);
    }

    @GetMapping
    public List<Architecture> getAllArchitectures() {
        return architectureService.getAllArchitectures();
    }

    @GetMapping("/{id}")
    public Architecture getArchitectureById(@PathVariable Long id) {
        return architectureService.getArchitectureById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteArchitecture(@PathVariable Long id) {
        architectureService.deleteArchitecture(id);
    }

}
