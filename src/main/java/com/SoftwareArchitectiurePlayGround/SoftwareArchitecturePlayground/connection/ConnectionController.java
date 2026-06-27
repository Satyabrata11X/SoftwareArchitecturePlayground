package com.SoftwareArchitectiurePlayGround.SoftwareArchitecturePlayground.connection;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/connections")
@CrossOrigin("*")
public class ConnectionController {

    private final ConnectionService connectionService;

    public ConnectionController(ConnectionService connectionService) {
        this.connectionService = connectionService;
    }

    @PostMapping
    public Connection createConnection(@RequestBody Connection connection) {
        return connectionService.createConnection(connection);
    }

    @GetMapping
    public List<Connection> getAllConnections() {
        return connectionService.getAllConnections();
    }

    @GetMapping("/{id}")
    public Connection getConnectionById(@PathVariable Long id) {
        return connectionService.getConnectionById(id);
    }

    // NEW ENDPOINT
    @GetMapping("/architecture/{architectureId}")
    public List<Connection> getConnectionsByArchitecture(
            @PathVariable Long architectureId) {

        return connectionService
                .getConnectionsByArchitecture(architectureId);

    }

    @DeleteMapping("/{id}")
    public void deleteConnection(@PathVariable Long id) {
        connectionService.deleteConnection(id);
    }

}