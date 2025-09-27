package com.example.renting.service;

import com.example.renting.model.Order;
import com.example.renting.model.Vehicle;
import com.example.renting.repository.OrderRepository;
import com.example.renting.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class VehicleService {

    @Autowired
    private VehicleRepository vehicleRepository;

    @Autowired
    private OrderRepository orderRepository;

    public List<Vehicle> findAll() {
        return vehicleRepository.findAll();
    }

    public Vehicle findById(Integer id) {
        Optional<Vehicle> vehicle = vehicleRepository.findById(id);
        try {
            if (!vehicle.isPresent()) {
                throw new RuntimeException("Veiculo nao encontrado");
            }
            return vehicle.get();
        } catch (Exception e) {
            throw new RuntimeException("erro: " + e.getMessage());
        }
    }

    public Vehicle findByPlate(String plate) {
        Optional<Vehicle> vehicle = vehicleRepository.findByPlate(plate);
        try {
            if (!vehicle.isPresent()) {
                throw new RuntimeException("Veiculo nao encontrado");
            }
            return vehicle.get();
        } catch (Exception e) {
            throw new RuntimeException("erro: " + e.getMessage());
        }
    }

    public Vehicle registerVehicle(Vehicle vehicle) {
        try {
            if (vehicle == null) {
                throw new IllegalArgumentException("Veiculo nao pode ser null");
            }
            if (vehicleRepository.findByPlate(vehicle.getPlate()).isPresent()) {
                throw new IllegalArgumentException("Placa ja cadastrada");
            }

            return vehicleRepository.save(vehicle);
        } catch (Exception e) {
            throw new RuntimeException("Erro ao registrar veiculo: " + e.getMessage(), e);
        }

    }

    public Vehicle updateVehicle(Integer id, Vehicle updatedVehicle) {
        if (updatedVehicle == null) {
            throw new IllegalArgumentException("Veiculo não pode ser nulo");
        }

        Vehicle existingVehicle = vehicleRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("vehiclee não encontrado com ID: " + id));

        existingVehicle.setPlate(updatedVehicle.getPlate());
        existingVehicle.setRegistration(updatedVehicle.getRegistration());
        existingVehicle.setYear(updatedVehicle.getYear());
        existingVehicle.setBrand(updatedVehicle.getBrand());
        existingVehicle.setModel(updatedVehicle.getModel());

        return vehicleRepository.save(existingVehicle);

    }

    public boolean deleteVehicle(Integer id) {
        try {
            Optional<Vehicle> vehicle = vehicleRepository.findById(id);

            if (vehicle.isPresent()) {
                List<Order> orders = orderRepository.findByVehicleId(id);
                if (!orders.isEmpty()) {
                    orderRepository.deleteAll(orders);
                }
                vehicleRepository.deleteById(id);
                return true;
            }
            return false;
        } catch (Exception e) {
            throw new RuntimeException("Erro ao excluir veículo: " + e.getMessage(), e);
        }
    }
}
