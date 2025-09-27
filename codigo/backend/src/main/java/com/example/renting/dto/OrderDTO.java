package com.example.renting.dto;

public record OrderDTO(
 Integer id,
 Integer clientId,
 String clientName,
 Integer vehicleId,
 String vehicleModel,
 String startDate,
 String endDate,
 String status
) {
}