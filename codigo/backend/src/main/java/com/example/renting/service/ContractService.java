package com.example.renting.service;

import com.example.renting.dto.ContractDTO;
import com.example.renting.model.Agent;
import com.example.renting.model.Contract;
import com.example.renting.model.Order;
import com.example.renting.repository.AgentRepository;
import com.example.renting.repository.ContractRepository;
import com.example.renting.repository.OrderRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContractService {

    @Autowired
    private ContractRepository contractRepository;
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private AgentRepository agentRepository;

    public List<Contract> findAll() {
        return contractRepository.findAll();
    }

    public Contract findById(Integer id) {
        return contractRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Contrato não encontrado"));
    }

    public Contract registerContract(Contract contract) {
        return contractRepository.save(contract);
    }

        public Contract createContract(ContractDTO dto) {
        Order order = orderRepository.findById(dto.orderId())
                .orElseThrow(() -> new RuntimeException("Order not found"));

        Agent agent = agentRepository.findById(dto.agentId())
                .orElseThrow(() -> new RuntimeException("Agent not found"));

        Contract contract = new Contract();
        contract.setOrder(order);
        contract.setAgent(agent);
        contract.setCreditAmount(dto.creditAmount());
        contract.setInterestRate(dto.interestRate());
        contract.setDurationMonths(dto.durationMonths());

        return contractRepository.save(contract);
    }

    public Contract updateContract(Integer id, Contract updatedContract) {
        Contract existingContract = findById(id);
        existingContract.setCreditAmount(updatedContract.getCreditAmount());
        existingContract.setInterestRate(updatedContract.getInterestRate());
        existingContract.setDurationMonths(updatedContract.getDurationMonths());
        return contractRepository.save(existingContract);
    }

    public void deleteContract(Integer id) {
        contractRepository.deleteById(id);
    }
}