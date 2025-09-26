# Stage 1: Build frontend (Next.js)
FROM node:22 AS frontend-build
WORKDIR /app/frontend

# Copia package.json e package-lock.json para instalar dependências
COPY frontend/renting-cars/my-app/package*.json ./
RUN npm install

# Copia o restante do frontend
COPY frontend/renting-cars/my-app/ ./

# Build do Next.js
RUN npm run build

# Stage 2: Build backend (Spring Boot)
FROM maven:3.9-eclipse-temurin-17 AS backend-build
WORKDIR /app

# Copia pom.xml e baixa dependências
COPY backend/pom.xml .          
RUN mvn dependency:go-offline

# Copia o backend
COPY backend/ .                

# Copia os arquivos do frontend build para o backend (SSR + estáticos)
# Next.js App Router gera .next e public
COPY --from=frontend-build /app/frontend/.next ./src/main/resources/.next
COPY --from=frontend-build /app/frontend/public ./src/main/resources/public
COPY --from=frontend-build /app/frontend/package.json ./src/main/resources/frontend-package.json

# Build do backend
RUN mvn clean package -DskipTests

# Stage 3: Runtime
FROM eclipse-temurin:17-jdk
WORKDIR /app

# Copia o jar final
COPY --from=backend-build /app/target/*.jar app.jar

EXPOSE 8080
CMD ["java", "-jar", "app.jar"]
