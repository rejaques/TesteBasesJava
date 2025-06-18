Projeto Teste

Descrição

Este é um projeto de exemplo desenvolvido com Spring Boot, utilizando Spring Security para autenticação e autorização, Spring Data JPA para persistência de dados e PostgreSQL como banco de dados. O projeto também integra a API ViaCEP para consulta de endereços.

Tecnologias Utilizadas

•
Java 17

•
Spring Boot 3.5.0

•
Spring Security

•
Spring Data JPA

•
PostgreSQL

•
Maven

•
JSP (JavaServer Pages)

•
HTML, CSS, JavaScript

•
ViaCEP API

Estrutura do Projeto

O projeto segue a estrutura padrão de um aplicativo Spring Boot:

Plain Text


src/
├── main/
│   ├── java/
│   │   └── com/tokio_marine/teste/
│   │       ├── config/             # Configurações de segurança, CORS, etc.
│   │       ├── controller/         # Controladores REST e de páginas
│   │       ├── dto/                # Objetos de Transferência de Dados (DTOs)
│   │       ├── exception/          # Classes de exceção personalizadas
│   │       ├── model/              # Entidades de domínio (JPA)
│   │       ├── repository/         # Interfaces de repositório (Spring Data JPA)
│   │       └── service/            # Lógica de negócio e interfaces de serviço
│   ├── resources/          # Arquivos de configuração (application.properties), estáticos e templates
│   └── webapp/             # Arquivos web (JSP, CSS, JS)
└── test/                   # Testes unitários e de integração


Como Executar

1.
Pré-requisitos:

•
Java Development Kit (JDK) 17 ou superior

•
Maven

•
PostgreSQL

•
Docker (Opcional)

1.
Configuração do Banco de Dados:

•
Crie um banco de dados PostgreSQL para o projeto.

•
Atualize as configurações de conexão do banco de dados no arquivo src/main/resources/application.properties:

1.
Compilar e Executar:

•
Rodando o projeto localmente

Endpoints da API

Markdown


POST /api/auth/login - Autenticação JWT

POST /api/auth/register - Cadastro de usuários

GET /usuarios - Listagem paginada

POST /usuarios - Criação

PUT /usuarios/{id} - Atualização

DELETE /usuarios/{id} - Exclusão


Autenticação

Markdown


JWT Token: após realizar o login, utilizar o token no header:

Authorization: Bearer seu-token


Visualização

API estará disponivel em:
http://localhost:8080/login

