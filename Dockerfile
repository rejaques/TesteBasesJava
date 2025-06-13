# Etapa de construção usando Maven com OpenJDK 17
FROM maven:3.8-openjdk-17 AS builder
WORKDIR /app
COPY . .
RUN mvn clean install -DskipTests

# Usar imagem oficial do Tomcat com suporte ao OpenJDK 17
#FROM tomcat:10.1.31-jdk17
#WORKDIR /usr/local/tomcat/webapps/

#COPY --from=builder /app/target/protocolo-0.0.1-SNAPSHOT.war ./protocolo.war

# Expor a porta padrão do Tomcat
EXPOSE 8080

# Comando para iniciar o servidor Tomcat
CMD ["java", "-jar", "/app/target/teste-0.0.1-SNAPSHOT.war"]