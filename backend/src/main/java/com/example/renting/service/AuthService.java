package com.example.renting.service;

import com.example.renting.model.User;
import com.example.renting.repository.UserRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
public class AuthService {

 @Autowired
 private UserRepository userRepository;

 @Autowired
 private PasswordEncoder passwordEncoder;

 private final String SECRET_KEY = "your_secret_key";

 public String authenticate(String username, String password) {
     Optional<User> user = userRepository.findByUsername(username);
     if (user.isPresent() && passwordEncoder.matches(password, user.get().getPassword())) {
         return Jwts.builder()
                 .setSubject(username)
                 .setIssuedAt(new Date())
                 .setExpiration(new Date(System.currentTimeMillis() + 86400000)) // 1 dia
                 .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
                 .compact();
     }
     throw new RuntimeException("Credenciais inválidas");
 }

 public User register(User user) {
     user.setPassword(passwordEncoder.encode(user.getPassword()));
     return userRepository.save(user);
 }
}