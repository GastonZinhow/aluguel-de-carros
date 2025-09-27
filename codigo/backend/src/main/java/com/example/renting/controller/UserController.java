package com.example.renting.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.renting.service.UserService;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

  @Autowired
  private UserService userService;

  @PutMapping("/{id}/password")
  public ResponseEntity<String> updatePassword(@PathVariable Integer id, @RequestBody String newPassword) {
      userService.updatePassword(id, newPassword);
      return ResponseEntity.ok("Senha atualizada com sucesso!");
  }
}