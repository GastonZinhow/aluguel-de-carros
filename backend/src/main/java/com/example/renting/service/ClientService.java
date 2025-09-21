package com.example.renting.service;

import com.example.renting.model.Client;
import com.example.renting.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class ClientService {

    @Autowired
    private ClientRepository clientRepository;


    public Client registerClient(Client client){
        try{
            if(client == null){
                throw new IllegalArgumentException("Cliente nao pode ser null");
            }
            if(clientRepository.existsByCpf(client.getCpf())){
                throw new IllegalArgumentException("CPF ja cadastrado");
            }

            return clientRepository.save(client);
        } catch (Exception e) {
            throw new RuntimeException("Erro ao registrar usuário: " + e.getMessage(), e);
        }

    }

    public List<Client> findAll() {
		return clientRepository.findAll();
	}

    public Client findById(Integer id){
        Optional<Client> client = clientRepository.findById(id);
        try {
            if (!client.isPresent()) {
                throw new RuntimeException("Cliente nao encontrado");
            }
            return client.get();
        }catch (Exception e) {
            throw new RuntimeException("erro: "+ e.getMessage());
        }
    }

    public Client findByCpf(String cpf){
        Optional<Client> client = clientRepository.findByCpf(cpf);
        try {
            if (!client.isPresent()) {
                throw new RuntimeException("Cliente nao encontrado");
            }
            return client.get();
        }catch (Exception e) {
            throw new RuntimeException("erro: "+ e.getMessage());
        }
    }

    public Client updateClient(Integer id, Client newData) {
        if (newData == null) {
            throw new IllegalArgumentException("Cliente não pode ser nulo");
        }

        Client existingClient = clientRepository.findById(id)
            .orElseThrow(() -> new NoSuchElementException("Cliente não encontrado com ID: " + id));

        existingClient.setName(newData.getName());
        existingClient.setCpf(newData.getCpf());
        existingClient.setRg(newData.getRg());
        existingClient.setOccupation(newData.getOccupation());
        existingClient.setAddress(newData.getAddress());
        existingClient.setIncome(newData.getIncome());
        existingClient.setCompany(newData.getCompany());

        return clientRepository.save(existingClient);
    }

    public boolean deleteClient(Integer id) {
        try {
            Optional<Client> client = clientRepository.findById(id);

            if (client.isPresent()) {
                clientRepository.deleteById(id);
                return true;
            }
            return false;
        } catch (Exception e) {
            throw new RuntimeException("Erro ao excluir cliente: " + e.getMessage(), e);
        }
    }
}
