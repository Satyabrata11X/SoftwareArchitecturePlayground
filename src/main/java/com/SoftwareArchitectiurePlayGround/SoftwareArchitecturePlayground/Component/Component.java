package com.SoftwareArchitectiurePlayGround.SoftwareArchitecturePlayground.Component;


import com.SoftwareArchitectiurePlayGround.SoftwareArchitecturePlayground.architecture.Architecture;
import jakarta.persistence.*;
import lombok.*;


@Entity
@Table(name = "components")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder


public class Component {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Enumerated(EnumType.STRING)
    private ComponentType type;

    @ManyToOne
    @JoinColumn(name = "architecture_id")
    private Architecture architecture;

}