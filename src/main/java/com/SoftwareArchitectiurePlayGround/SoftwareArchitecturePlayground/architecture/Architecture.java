package com.SoftwareArchitectiurePlayGround.SoftwareArchitecturePlayground.architecture;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "architectures")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Architecture {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
}
