<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registro - Sistema de Gestão</title>
    <link rel="stylesheet" href="/css/styles.css">
</head>
<body>
    <div class="register-container">
        <div class="text-center mb-3">
            <h2>Criar Conta</h2>
            <p>Preencha os dados para criar sua conta</p>
        </div>
        
        <div id="alert-container"></div>
        
        <form id="registerForm" onsubmit="fazerRegistro(event)">
            <div class="form-group">
                <label for="nome">Nome Completo:</label>
                <input type="text" id="nome" name="nome" class="form-control" placeholder="Digite seu nome completo" required>
            </div>
            
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" class="form-control" placeholder="Digite seu email" required>
            </div>
            
            <div class="form-group">
                <label for="senha">Senha:</label>
                <input type="password" id="senha" name="senha" class="form-control" placeholder="Digite sua senha" required minlength="6">
            </div>
            
            <div class="form-group">
                <label for="confirmarSenha">Confirmar Senha:</label>
                <input type="password" id="confirmarSenha" name="confirmarSenha" class="form-control" placeholder="Confirme sua senha" required minlength="6">
            </div>
            
            <div class="form-group">
                <button type="submit" class="btn btn-success" style="width: 100%;">
                    <span id="register-text">Criar Conta</span>
                    <span id="register-loading" class="loading">Carregando...</span>
                </button>
            </div>
        </form>
        
        <div class="text-center mt-3">
            <p>Já tem conta? <a href="/login" class="btn btn-secondary">Fazer login</a></p>
        </div>
    </div>

    <script src="/js/auth.js"></script>
</body>
</html>


