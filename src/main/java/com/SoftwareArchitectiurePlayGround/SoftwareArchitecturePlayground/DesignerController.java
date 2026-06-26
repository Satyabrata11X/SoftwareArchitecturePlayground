package com.SoftwareArchitectiurePlayGround.SoftwareArchitecturePlayground;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class DesignerController {

    @GetMapping("/designer-page")
    public String designerPage() {
        return "designer";
    }
}