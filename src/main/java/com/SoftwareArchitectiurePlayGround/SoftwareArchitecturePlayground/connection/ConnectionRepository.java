package com.SoftwareArchitectiurePlayGround.SoftwareArchitecturePlayground.connection;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ConnectionRepository
        extends JpaRepository<Connection, Long> {

    List<Connection> findByTargetComponentId(Long targetComponentId);
}