package com.SoftwareArchitectiurePlayGround.SoftwareArchitecturePlayground.connection;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface ConnectionRepository extends JpaRepository<Connection, Long> {

    List<Connection> findByTargetComponentId(Long targetComponentId);

    List<Connection> findBySourceComponentId(Long sourceComponentId);

    List<Connection> findBySourceComponentArchitectureId(Long architectureId);


    boolean existsBySourceComponentIdAndTargetComponentId(
            Long sourceComponentId,
            Long targetComponentId
    );


    @Transactional
    @Modifying
    void deleteBySourceComponentId(Long componentId);

    @Transactional
    @Modifying
    void deleteByTargetComponentId(Long componentId);

}