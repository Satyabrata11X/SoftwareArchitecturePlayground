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
        return connectionRepository.save(connection);
    }

    public List<Connection> getAllConnections() {
        return connectionRepository.findAll();
    }

    public Connection getConnectionById(Long id) {
        return connectionRepository.findById(id).orElse(null);
    }

    // NEW
    public List<Connection> getConnectionsByArchitecture(Long architectureId) {

        return connectionRepository
                .findBySourceComponentArchitectureId(architectureId);

    }

    public void deleteConnection(Long id) {
        connectionRepository.deleteById(id);
    }

}