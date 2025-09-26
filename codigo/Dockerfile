# Stage 1: Build frontend (Next.js)
FROM node:22 AS frontend-build
WORKDIR /app/frontend

COPY codigo/frontend/renting-cars/my-app/package*.json ./
RUN npm install
COPY codigo/frontend/renting-cars/my-app/ ./
RUN npm run build

# Stage 2: Build backend (Spring Boot)
FROM maven:3.9-eclipse-temurin-17 AS backend-build
WORKDIR /app

COPY codigo/backend/pom.xml .
RUN mvn dependency:go-offline
COPY codigo/backend/ .
COPY --from=frontend-build /app/frontend/.next ./src/main/resources/.next
COPY --from=frontend-build /app/frontend/public ./src/main/resources/public
COPY --from=frontend-build /app/frontend/package.json ./src/main/resources/frontend-package.json

RUN mvn clean package -DskipTests

# Stage 3: Runtime
FROM eclipse-temurin:17-jdk
WORKDIR /app

COPY --from=backend-build /app/target/*.jar app.jar

# Usar porta dinâmica do Railway
EXPOSE $PORT
CMD ["sh", "-c", "java -Dserver.port=$PORT -jar app.jar"]
