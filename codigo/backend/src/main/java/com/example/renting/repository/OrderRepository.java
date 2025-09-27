package com.example.renting.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.renting.model.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {
  List<Order> findByClientId(Integer clientId);

  List<Order> findByVehicleId(Integer vehicleId);
}
