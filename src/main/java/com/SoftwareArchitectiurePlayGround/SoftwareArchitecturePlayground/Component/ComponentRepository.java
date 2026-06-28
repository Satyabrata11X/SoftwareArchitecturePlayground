package com.SoftwareArchitectiurePlayGround.SoftwareArchitecturePlayground.Component;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface ComponentRepository extends JpaRepository<Component, Long> {

    // Get all components of an architecture
    List<Component> findByArchitectureId(Long architectureId);

    // Check duplicate component name inside the same architecture
    boolean existsByNameIgnoreCaseAndArchitectureId(
            String name,
            Long architectureId
    );

    // Delete all components of an architecture
    @Transactional
    @Modifying
    void deleteByArchitectureId(Long architectureId);

}