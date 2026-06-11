package com.SoftwareArchitectiurePlayGround.SoftwareArchitecturePlayground.architecture;


import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ArchitectureService {

    private final ArchitectureRepository architectureRepository;

    public ArchitectureService(ArchitectureRepository architectureRepository) {
        this.architectureRepository = architectureRepository;
    }

    public Architecture createArchitecture(Architecture architecture){
        return architectureRepository.save(architecture);
    }

    public List<Architecture> getAllArchitectures() {
        return architectureRepository.findAll();
    }

    public Architecture getArchitectureById(Long id) {
        return architectureRepository.findById(id).orElse(null);
    }

    public void deleteArchitecture(Long id) {
        architectureRepository.deleteById(id);
    }
}
