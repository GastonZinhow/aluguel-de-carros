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

import java.time.LocalDate;
import java.util.List;
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
                        order.getClient() != null ? order.getClient().getId() : null,
                        order.getClient() != null ? order.getClient().getName() : "Cliente não encontrado",
                        order.getVehicle() != null ? order.getVehicle().getId() : null,
                        order.getVehicle() != null ? order.getVehicle().getModel() : "Veículo não encontrado",
                        order.getStartDate().toString(),
                        order.getEndDate().toString(),
                        order.getOrderStatus().name()))
                .collect(Collectors.toList());
    }

    public OrderDTO findByIdDTO(Integer id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pedido não encontrado!"));

        return new OrderDTO(
                order.getId(),
                order.getClient().getId(),
                order.getClient().getName(),
                order.getVehicle().getId(),
                order.getVehicle().getPlate(),
                order.getStartDate().toString(),
                order.getEndDate().toString(),
                order.getOrderStatus().name());
    }

    public Order createOrder(OrderDTO orderDTO) {
        Client client = clientRepository.findById(orderDTO.clientId())
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado!"));

        Vehicle vehicle = vehicleRepository.findById(orderDTO.vehicleId())
                .orElseThrow(() -> new RuntimeException("Veículo não encontrado!"));

        Order order = new Order();
        order.setClient(client);
        order.setVehicle(vehicle);
        order.setStartDate(LocalDate.parse(orderDTO.startDate()));
        order.setEndDate(LocalDate.parse(orderDTO.endDate()));
        order.setOrderStatus(OrderStatus.valueOf(orderDTO.status()));

        return orderRepository.save(order);
    }

    public Order createOrderFromDTO(OrderDTO orderDTO) {
        if (orderDTO.clientId() == null || orderDTO.clientId() <= 0) {
            throw new RuntimeException("Cliente não encontrado com ID: " + orderDTO.clientId());
        }

        if (orderDTO.vehicleId() == null || orderDTO.vehicleId() <= 0) {
            throw new RuntimeException("Veículo não encontrado com ID: " + orderDTO.vehicleId());
        }

        Client client = clientRepository.findById(orderDTO.clientId())
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado com ID: " + orderDTO.clientId()));

        Vehicle vehicle = vehicleRepository.findById(orderDTO.vehicleId())
                .orElseThrow(() -> new RuntimeException("Veículo não encontrado com ID: " + orderDTO.vehicleId()));

        Order order = new Order();
        order.setClient(client);
        order.setVehicle(vehicle);
        order.setStartDate(LocalDate.parse(orderDTO.startDate()));
        order.setEndDate(LocalDate.parse(orderDTO.endDate()));
        order.setOrderStatus(OrderStatus.valueOf(orderDTO.status()));

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
                System.out.println("Status inválido: {} " + status + " " + e);
                return false;
            }
        }).orElse(false);
    }

    public Order updateOrderFromDTO(Integer id, OrderDTO orderDTO) {
        Order existingOrder = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pedido não encontrado com ID: " + id));

        Client client = clientRepository.findById(orderDTO.clientId())
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado com ID: " + orderDTO.clientId()));

        Vehicle vehicle = vehicleRepository.findById(orderDTO.vehicleId())
                .orElseThrow(() -> new RuntimeException("Veículo não encontrado com ID: " + orderDTO.vehicleId()));

        existingOrder.setClient(client);
        existingOrder.setVehicle(vehicle);
        existingOrder.setStartDate(LocalDate.parse(orderDTO.startDate()));
        existingOrder.setEndDate(LocalDate.parse(orderDTO.endDate()));
        existingOrder.setOrderStatus(OrderStatus.valueOf(orderDTO.status()));

        return orderRepository.save(existingOrder);
    }
}
