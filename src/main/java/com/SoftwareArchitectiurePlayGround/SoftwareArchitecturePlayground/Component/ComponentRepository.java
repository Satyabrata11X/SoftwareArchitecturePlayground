package com.SoftwareArchitectiurePlayGround.SoftwareArchitecturePlayground.Component;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ComponentRepository
        extends JpaRepository<Component, Long> {

    List<Component> findByArchitectureId(Long architectureId);

}