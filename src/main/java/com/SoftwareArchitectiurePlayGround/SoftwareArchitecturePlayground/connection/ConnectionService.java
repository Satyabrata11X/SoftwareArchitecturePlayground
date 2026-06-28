package com.SoftwareArchitectiurePlayGround.SoftwareArchitecturePlayground.connection;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ConnectionService {

    private final ConnectionRepository connectionRepository;

    public ConnectionService(ConnectionRepository connectionRepository) {
        this.connectionRepository = connectionRepository;
    }


    public Connection createConnection(Connection connection) {

        Long sourceId = connection.getSourceComponent().getId();

        Long targetId = connection.getTargetComponent().getId();

        // Prevent self connection

        if (sourceId.equals(targetId)) {

            throw new RuntimeException(
                    "A component cannot connect to itself."
            );

        }

        // Prevent duplicate connection

        boolean exists =
                connectionRepository
                        .existsBySourceComponentIdAndTargetComponentId(
                                sourceId,
                                targetId
                        );

        if (exists) {

            throw new RuntimeException(
                    "Connection already exists."
            );

        }

        return connectionRepository.save(connection);

    }


    public List<Connection> getAllConnections() {

        return connectionRepository.findAll();

    }


    public Connection getConnectionById(Long id) {

        return connectionRepository.findById(id).orElse(null);

    }


    public List<Connection> getConnectionsByArchitecture(Long architectureId) {

        return connectionRepository
                .findBySourceComponentArchitectureId(architectureId);

    }


    public void deleteConnection(Long id) {

        connectionRepository.deleteById(id);

    }

}