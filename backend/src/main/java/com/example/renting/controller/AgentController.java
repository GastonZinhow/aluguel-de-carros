package com.example.renting.controller;

import com.example.renting.model.Agent;
import com.example.renting.service.AgentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/agents")
public class AgentController {

 @Autowired
 private AgentService agentService;

 @GetMapping
 public ResponseEntity<List<Agent>> findAll() {
     return ResponseEntity.ok(agentService.findAll());
 }

 @GetMapping("/{id}")
 public ResponseEntity<Agent> findById(@PathVariable Integer id) {
     return ResponseEntity.ok(agentService.findById(id));
 }

 @PostMapping
 public ResponseEntity<Agent> register(@RequestBody Agent agent) {
     return ResponseEntity.ok(agentService.registerAgent(agent));
 }

 @PutMapping("/{id}")
 public ResponseEntity<Agent> update(@PathVariable Integer id, @RequestBody Agent agent) {
     return ResponseEntity.ok(agentService.updateAgent(id, agent));
 }

 @DeleteMapping("/{id}")
 public ResponseEntity<Void> delete(@PathVariable Integer id) {
     agentService.deleteAgent(id);
     return ResponseEntity.noContent().build();
 }
}