FROM node:18 AS build-frontend
WORKDIR /app

COPY frontend/renting-cars/my-app/package*.json ./
RUN npm install

COPY frontend/renting-cars/my-app/ ./

RUN npm run build

FROM maven:3.9.9-eclipse-temurin-17 AS build-backend
WORKDIR /app

COPY backend/pom.xml ./
RUN mvn dependency:go-offline

COPY backend/ ./

RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jdk AS final
WORKDIR /app

COPY --from=build-backend /app/target/*.jar app.jar

COPY --from=build-frontend /app/.next ./.next
COPY --from=build-frontend /app/public ./public
COPY --from=build-frontend /app/package*.json ./

EXPOSE 8080
EXPOSE 3000

ENTRYPOINT ["java", "-jar", "app.jar"]

