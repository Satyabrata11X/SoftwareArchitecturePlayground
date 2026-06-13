package com.SoftwareArchitectiurePlayGround.SoftwareArchitecturePlayground.simulation;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/bottleneck")
public class BottleneckController {

    private final BottleneckService bottleneckService;

    public BottleneckController(BottleneckService bottleneckService) {
        this.bottleneckService = bottleneckService;
    }

    @GetMapping
    public BottleneckResult findBottleneck(
            @RequestParam Long architectureId,
            @RequestParam int users) {

        return bottleneckService.findBottleneck(
                architectureId,
                users
        );
    }
}