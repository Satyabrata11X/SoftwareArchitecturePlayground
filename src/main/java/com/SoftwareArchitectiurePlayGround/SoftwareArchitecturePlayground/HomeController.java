package com.SoftwareArchitectiurePlayGround.SoftwareArchitecturePlayground;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "index";
    }

    @GetMapping("/architectures-page")
    public String architectures() {
        return "architectures";
    }

    @GetMapping("/components-page")
    public String components() {
        return "components";
    }

    @GetMapping("/connections-page")
    public String connections() {
        return "connections";
    }

    @GetMapping("/simulation-page")
    public String simulation() {
        return "simulation";
    }

}