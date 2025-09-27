package com.example.renting.controller;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.example.renting.dto.OrderDTO;
import com.example.renting.model.Order;
import com.example.renting.service.OrderService;

@RestController
@RequestMapping(value = "/orders")
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @GetMapping
    public ResponseEntity<List<OrderDTO>> findAll() {
        List<OrderDTO> list = orderService.findAllDTOs();
        return ResponseEntity.ok().body(list);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<OrderDTO> findById(@PathVariable Integer id) {
        OrderDTO obj = orderService.findByIdDTO(id);
        return ResponseEntity.ok().body(obj);
    }

    @PostMapping
    public ResponseEntity<Order> insert(@RequestBody OrderDTO objDTO) {
        Order obj = orderService.createOrderFromDTO(objDTO);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(obj.getId())
                .toUri();
        return ResponseEntity.created(uri).body(obj);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Order> updateOrder(@PathVariable Integer id, @RequestBody OrderDTO orderDTO) {
        Order updatedOrder = orderService.updateOrderFromDTO(id, orderDTO);
        return ResponseEntity.ok(updatedOrder);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<String> updateStatus(
            @PathVariable Integer id,
            @RequestParam Integer status) {
        boolean updated = orderService.updateStatus(id, status);
        if (updated) {
            return ResponseEntity.ok("Status atualizado com sucesso!");
        } else {
            return ResponseEntity.badRequest().body("Status inválido ou pedido não encontrado.");
        }
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        orderService.deleteOrder(id);
        return ResponseEntity.noContent().build();
    }
}