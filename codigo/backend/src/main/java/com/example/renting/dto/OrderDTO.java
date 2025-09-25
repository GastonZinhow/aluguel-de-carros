package com.example.renting.dto;

public record OrderDTO(
        Integer id,
        String clientName,
        String vehicleModel,
        String startDate,
        String endDate,
        String status
) {}
