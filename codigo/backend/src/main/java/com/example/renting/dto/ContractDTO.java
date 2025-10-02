package com.example.renting.dto;

public record ContractDTO(
    Integer orderId,
    Integer agentId,
    Double creditAmount,
    Double interestRate,
    Integer durationMonths
) {}