<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - Sistema de Gestão</title>
    <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

    <link rel="stylesheet" href="<c:url value='/css/styles.css'/>">
</head>
<body>
        <div class="login-container">
            <div class="text-center mb-3">
                <h2>Sistema de Gestão</h2>
                <p>Faça login para acessar o sistema</p>
            </div>
            
            <div id="alert-container"></div>
            
            <form id="loginForm">
        <div class="form-group">
            <label for="username">Email:</label>
            <input type="text" id="email" name="username" class="form-control" placeholder="Digite seu email" required>
        </div>
        
        <div class="form-group">
            <label for="password">Senha:</label>
            <input type="password" id="senha" name="password" class="form-control" placeholder="Digite sua senha" required>
        </div>
        
        <div class="form-group">
            <button type="button" id="loginBtn" class="btn btn-primary" style="width: 100%;">
                Entrar
            </button>
        </div>
    </form>

        
        <div class="text-center mt-3">
            <p>Não tem conta? <a href="/registro" class="btn btn-secondary">Criar conta</a></p>
        </div>
    </div>

    <script src="/js/auth.js"></script>
</body>
</html>

