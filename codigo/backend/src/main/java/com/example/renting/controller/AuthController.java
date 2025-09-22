package com.example.renting.controller;

import com.example.renting.model.User;
import com.example.renting.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

 @Autowired
 private AuthService authService;

 @PostMapping("/login")
 public ResponseEntity<String> login(@RequestParam String username, @RequestParam String password) {
     String token = authService.authenticate(username, password);
     return ResponseEntity.ok(token);
 }

 @PostMapping("/register")
 public ResponseEntity<User> register(@RequestBody User user) {
     User registeredUser = authService.register(user);
     return ResponseEntity.ok(registeredUser);
 }
}