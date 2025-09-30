# Projeto Sistema de Aluguel de Carros

O Sistema de Aluguel de Carros é uma aplicação web para gestão de clientes, veículos, contratos e pedidos de aluguel, construída com **Java + Spring Boot** no backend e **React** no frontend.  

---

## Sumário
- [Sobre o projeto](#sobre-o-projeto)  
- [Contexto](#contexto)  
- [Habilidades](#habilidades)  
- [Demo](#demo)  
- [Tecnologias utilizadas](#tecnologias-utilizadas)  
  - [Front-end](#front-end)  
  - [Back-end](#back-end)  
  - [Banco de dados](#banco-de-dados)  
- [Uso](#uso)  
- [Documentação da API](#documentação-da-api)  
  - [Visão Geral](#visão-geral)  
- [Requisitos do projeto](#requisitos-do-projeto)  
- [Status de desenvolvimento](#status-de-desenvolvimento)  

---

## Sobre o projeto  

### Contexto  
O desafio deste projeto foi desenvolver uma aplicação completa para gerenciar o fluxo de **aluguel de carros**. O sistema foi estruturado em arquitetura **MVC** com **Spring Boot** e integrado a um **frontend React**.  

Ele possibilita:  
- Registro de clientes e veículos  
- Criação, edição e listagem de pedidos de aluguel  
- Gestão de contratos associados  
- Controle de acesso por login  
- Avaliação e aprovação de pedidos por agentes  

---

## Habilidades
- Dockerização das aplicações (frontend, backend e banco)  
- Modelagem de dados com MySQL  
- Construção de uma API REST em **Java Spring Boot**  
- CRUD completo para clientes, veículos, pedidos e contratos  
- Integração com frontend em **React**  
- Implementação de autenticação e atualização de senha  
- Organização do projeto seguindo arquitetura **MVC**  

---

## Demo  

---

## Tecnologias utilizadas  

### Front-end  
- React  
- Vite.js  
- Tailwind CSS / Ant Design  

### Back-end  
- Java 21  
- Spring Boot 3  
- Spring MVC  
- Spring Data JPA  

### Banco de dados  
- MySQL  

### Testes  
- JUnit 5  
- Postman para integração  

---

## Uso  

Após logar, o usuário pode:  
- Registrar novos clientes e veículos  
- Criar e gerenciar pedidos de aluguel  
- Editar clientes, veículos e contratos  
- Alterar o status de pedidos  
- Visualizar contratos e aprovações feitas por agentes  

---

## Documentação da API  

### Visão geral  

| Endpoint               | Método | Descrição |
|------------------------|--------|------------|
| `/login`               | POST   | Faz login do usuário |
| `/users/{id}/password` | PUT    | Atualiza a senha de um usuário |
| `/clients`             | GET    | Lista todos os clientes |
| `/clients/{id}`        | GET    | Retorna um cliente específico |
| `/clients`             | POST   | Cria um novo cliente |
| `/clients/{id}`        | PUT    | Atualiza dados de um cliente |
| `/clients/{id}`        | DELETE | Remove um cliente |
| `/vehicles`            | GET    | Lista veículos cadastrados |
| `/vehicles/{id}`       | GET    | Retorna veículo pelo ID |
| `/vehicles`            | POST   | Cadastra um novo veículo |
| `/vehicles/{id}`       | PUT    | Atualiza veículo existente |
| `/vehicles/{id}`       | DELETE | Remove veículo |
| `/orders`              | GET    | Lista pedidos |
| `/orders/{id}`         | GET    | Retorna pedido pelo ID |
| `/orders`              | POST   | Cria um novo pedido |
| `/orders/{id}`         | PUT    | Atualiza pedido |
| `/orders/{id}/status`  | PATCH  | Atualiza status de um pedido |
| `/contracts`           | GET    | Lista contratos |
| `/contracts/{id}`      | GET    | Retorna contrato pelo ID |
| `/contracts`           | POST   | Cria contrato |
| `/contracts/{id}`      | PUT    | Atualiza contrato |
| `/contracts/{id}`      | DELETE | Remove contrato |
| `/agents`              | GET    | Lista agentes |
| `/agents`              | POST   | Cadastra um agente |

---
## Requisitos do projeto
- Docker e Docker Compose
- JDK 21
- Node.js >= 16
- MySQL

---

## Status do Desenvolvimento
Concluido

