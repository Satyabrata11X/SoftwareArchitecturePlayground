package com.SoftwareArchitectiurePlayGround.SoftwareArchitecturePlayground.Component;

import com.SoftwareArchitectiurePlayGround.SoftwareArchitecturePlayground.architecture.Architecture;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(
        name = "components",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uk_architecture_component",
                        columnNames = {
                                "architecture_id",
                                "name"
                        }
                )
        }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Component {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ComponentType type;

    @ManyToOne
    @JoinColumn(name = "architecture_id", nullable = false)
    private Architecture architecture;

}