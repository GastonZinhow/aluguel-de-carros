package com.example.renting.model;

import jakarta.persistence.*;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "contracts")
public class Contract {

 @Id
 @GeneratedValue(strategy = GenerationType.IDENTITY)
 private Integer id;

 @ManyToOne
 @JoinColumn(name = "orders_id", nullable = false)
 private Order order;

 @ManyToOne
 @JoinColumn(name = "agent_id", nullable = false)
 private Agent agent;

 @Column(nullable = false)
 private Double creditAmount;

 @Column(nullable = false)
 private Double interestRate;

 @Column(nullable = false)
 private Integer durationMonths;
}