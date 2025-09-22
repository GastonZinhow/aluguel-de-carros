package com.example.renting.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.renting.model.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {

}
