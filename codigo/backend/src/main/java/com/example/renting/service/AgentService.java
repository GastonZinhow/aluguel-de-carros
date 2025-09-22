package com.example.renting.service;

import com.example.renting.model.Agent;
import com.example.renting.repository.AgentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AgentService {

 @Autowired
 private AgentRepository agentRepository;

 public List<Agent> findAll() {
     return agentRepository.findAll();
 }

 public Agent findById(Integer id) {
     return agentRepository.findById(id)
             .orElseThrow(() -> new RuntimeException("Agente não encontrado"));
 }

 public Agent registerAgent(Agent agent) {
     return agentRepository.save(agent);
 }

 public Agent updateAgent(Integer id, Agent updatedAgent) {
     Agent existingAgent = findById(id);
     existingAgent.setName(updatedAgent.getName());
     existingAgent.setCnpj(updatedAgent.getCnpj());
     existingAgent.setType(updatedAgent.getType());
     return agentRepository.save(existingAgent);
 }

 public void deleteAgent(Integer id) {
     agentRepository.deleteById(id);
 }
}