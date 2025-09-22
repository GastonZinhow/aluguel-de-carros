package com.example.renting.model;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

import jakarta.persistence.*;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "vehicle")
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, unique = true)
    private String plate;
    @Column(nullable = false)
    private String registration;
    @Column(nullable = false)
    private Integer year;
    @Column(nullable = false)
    private String brand;
    @Column(nullable = false)
    private String model;
    
}
