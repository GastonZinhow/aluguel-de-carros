package com.example.renting.model;

import jakarta.persistence.*;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "users")
public class User {

 @Id
 @GeneratedValue(strategy = GenerationType.IDENTITY)
 private Integer id;

 @Column(nullable = false, unique = true)
 private String username;

 @Column(nullable = false)
 private String password;

 @Column(nullable = false)
 private String role; 
}