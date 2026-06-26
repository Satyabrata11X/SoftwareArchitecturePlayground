package com.SoftwareArchitectiurePlayGround.SoftwareArchitecturePlayground.Component;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface ComponentRepository extends JpaRepository<Component, Long> {

    List<Component> findByArchitectureId(Long architectureId);

    @Transactional
    @Modifying
    void deleteByArchitectureId(Long architectureId);

}