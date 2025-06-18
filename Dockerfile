# Etapa de build
FROM maven:3.8-openjdk-17 AS builder
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Etapa final
FROM tomcat:10.1.31-jdk17
WORKDIR /usr/local/tomcat/webapps/
COPY --from=builder /app/target/*.war ROOT.war
EXPOSE 8080
