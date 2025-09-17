package com.example.renting.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "client")
public class Client {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name="rg", unique = true, nullable = false)
    private String rg;
    @Column(name="cpf", unique = true, nullable = false)
    private String cpf;
    @Column(name="occupation", nullable = false)
    private String occupation;
    @Column(name="address", nullable = false)
    private String address;
    @ElementCollection
    private List<Double> income;
    @ElementCollection
    private List<String> company;

}
