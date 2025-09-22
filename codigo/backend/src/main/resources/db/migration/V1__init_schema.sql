CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL
);

INSERT INTO users (username, password, role) VALUES
('admin', 'admin123', 'ADMIN'),
('joao', '123456', 'USER'),
('gaston', '123456', 'USER');

CREATE TABLE agents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    cnpj VARCHAR(20) NOT NULL UNIQUE,
    type VARCHAR(50) NOT NULL
);

INSERT INTO agents (name, cnpj, type) VALUES
('Agent One', '12345678000100', 'Type A'),
('Agent Two', '98765432000100', 'Type B');

CREATE TABLE clients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    rg VARCHAR(20) NOT NULL UNIQUE,
    cpf VARCHAR(20) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    occupation VARCHAR(100) NOT NULL,
    address VARCHAR(255) NOT NULL
);

INSERT INTO clients (rg, cpf, name, occupation, address) VALUES
('123456789', '11122233344', 'Seu zé', 'Engenheiro', 'Street 1'),
('987654321', '55566677788', 'Mirela', 'Artista', 'Street 2');

CREATE TABLE vehicles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    plate VARCHAR(20) NOT NULL UNIQUE,
    registration VARCHAR(50) NOT NULL,
    year INT NOT NULL,
    brand VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL
);

INSERT INTO vehicles (plate, registration, year, brand, model) VALUES
('ABC1234', 'REG123', 2020, 'Toyota', 'Corolla'),
('XYZ5678', 'REG456', 2021, 'Honda', 'Civic');

CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_id INT NOT NULL,
    vehicle_id INT NOT NULL,
    start_date DATE,
    end_date DATE,
    order_status ENUM('CANCELED','DELIVERED','PAID','SHIPPED','WAITING_PAYMENT'),
    rental_price DOUBLE,
    CONSTRAINT fk_orders_client FOREIGN KEY (client_id) REFERENCES clients(id),
    CONSTRAINT fk_orders_vehicle FOREIGN KEY (vehicle_id) REFERENCES vehicles(id)
);

CREATE TABLE contracts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    orders_id INT NOT NULL,
    agent_id INT NOT NULL,
    credit_amount DOUBLE NOT NULL,
    interest_rate DOUBLE NOT NULL,
    duration_months INT NOT NULL,
    CONSTRAINT fk_contract_orders FOREIGN KEY (orders_id) REFERENCES orders(id),
    CONSTRAINT fk_contract_agent FOREIGN KEY (agent_id) REFERENCES agents(id)
);