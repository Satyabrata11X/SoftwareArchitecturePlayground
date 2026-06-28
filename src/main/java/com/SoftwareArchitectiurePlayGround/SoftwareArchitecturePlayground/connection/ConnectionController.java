package com.SoftwareArchitectiurePlayGround.SoftwareArchitecturePlayground.connection;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<?> createConnection(
            @RequestBody Connection connection) {

        try {

            Connection savedConnection =
                    connectionService.createConnection(connection);

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(savedConnection);

        }

        catch (RuntimeException exception) {

            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(exception.getMessage());

        }

    }


    @GetMapping
    public List<Connection> getAllConnections() {

        return connectionService.getAllConnections();

    }


    @GetMapping("/{id}")
    public Connection getConnectionById(
            @PathVariable Long id) {

        return connectionService.getConnectionById(id);

    }



    @GetMapping("/architecture/{architectureId}")
    public List<Connection> getConnectionsByArchitecture(
            @PathVariable Long architectureId) {

        return connectionService
                .getConnectionsByArchitecture(architectureId);

    }


    @DeleteMapping("/{id}")
    public void deleteConnection(
            @PathVariable Long id) {

        connectionService.deleteConnection(id);

    }

}