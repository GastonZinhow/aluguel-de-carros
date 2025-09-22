package com.example.renting.service;

import com.example.renting.model.Contract;
import com.example.renting.repository.ContractRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContractService {

 @Autowired
 private ContractRepository contractRepository;

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