package com.example.renting.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.renting.dto.OrderDTO;
import com.example.renting.model.Client;
import com.example.renting.model.Order;
import com.example.renting.model.Vehicle;
import com.example.renting.model.enums.OrderStatus;
import com.example.renting.repository.ClientRepository;
import com.example.renting.repository.OrderRepository;
import com.example.renting.repository.VehicleRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ClientRepository clientRepository;

    @Autowired
    private VehicleRepository vehicleRepository;

    public List<Order> findAll() {
        return orderRepository.findAll();
    }

    public List<OrderDTO> findAllDTOs() {
        List<Order> orders = orderRepository.findAll();
        return orders.stream()
                .map(order -> new OrderDTO(
                        order.getId(),
                        order.getClient().getName(),
                        order.getVehicle().getModel(),
                        order.getStartDate().toString(),
                        order.getEndDate().toString(),
                        order.getOrderStatus().name()
                ))
                .collect(Collectors.toList());
    }

    public Order findById(Integer id) {
        Optional<Order> order = orderRepository.findById(id);
        try {
            if (!order.isPresent()) {
                throw new RuntimeException("Pedido nao encontrado");
            }
            return order.get();
        }catch (Exception e) {
            throw new RuntimeException("erro: "+ e.getMessage());
        }
    }

    public Order createOrder(Order order) {
        Client client = clientRepository.findById(order.getClient().getId())
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado!"));

        Vehicle vehicle = vehicleRepository.findById(order.getVehicle().getId())
                .orElseThrow(() -> new RuntimeException("Veículo não encontrado!"));

        order.setClient(client);
        order.setVehicle(vehicle);

        return orderRepository.save(order);
    }

    public void deleteOrder(Integer id) {
        if (orderRepository.findById(id) == null) {
            throw new RuntimeException("Pedido não encontrado com ID: " + id);
        }
        orderRepository.deleteById(id);
    }

    public boolean updateStatus(Integer id, Integer status) {
        return orderRepository.findById(id).map(order -> {
            try {
                OrderStatus os = OrderStatus.valueOf(status); 
                order.setOrderStatus(os);
                orderRepository.save(order);
                return true;
            } catch (IllegalArgumentException e) {
                System.out.println("Status inválido: {} " + status + " "+ e);
                return false;
            }
        }).orElse(false);
    }
}
