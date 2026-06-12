package com.SoftwareArchitectiurePlayGround.SoftwareArchitecturePlayground.connection;

import com.SoftwareArchitectiurePlayGround.SoftwareArchitecturePlayground.Component.Component;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "connections")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Connection {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "source_component_id")
    private Component sourceComponent;

    @ManyToOne
    @JoinColumn(name = "target_component_id")
    private Component targetComponent;

}