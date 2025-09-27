package com.example.renting.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.renting.model.User;
import com.example.renting.repository.UserRepository;

@Service
public class UserService {

  @Autowired
  private UserRepository userRepository;

  @Autowired
  private PasswordEncoder passwordEncoder;

  public void updatePassword(Integer id, String newPassword) {
      User user = userRepository.findById(id)
              .orElseThrow(() -> new RuntimeException("Usuário não encontrado com ID: " + id));

      user.setPassword(passwordEncoder.encode(newPassword));
      userRepository.save(user);
  }
}