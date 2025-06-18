<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - Sistema de Gestão</title>
    <link rel="stylesheet" href="/css/styles.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
</head>
<body>
    <nav class="navbar">
        <div class="container d-flex justify-content-between align-items-center">
            <a href="/dashboard" class="navbar-brand">Sistema de Gestão</a>
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a href="/dashboard" class="nav-link">Dashboard</a>
                </li>
                <li class="nav-item">
                    <a href="#" class="nav-link" onclick="logout().preventDefault()">Sair</a>
                </li>
            </ul>
        </div>
    </nav>

    <div class="container">
        <div id="alert-container"></div>
        
        <div class="row mb-3">
            <div class="col">
                <h1>Dashboard</h1>
                <p>Gerencie usuários e endereços do sistema</p>
            </div>
        </div>

        <!-- Seção de Usuários -->
        <div class="card mb-3">
            <div class="card-header d-flex justify-content-between align-items-center">
                <h3>Usuários</h3>
                <button type="button" class="btn btn-primary" onclick="abrirModalUsuario()">Novo Usuário</button>
            </div>
            <div class="card-body">
                <div class="loading" id="usuarios-loading">Carregando usuários...</div>
                <table class="table" id="usuarios-table" style="display: none;">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody id="usuarios-tbody">
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Seção de Endereços -->
        <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
                <h3>Endereços</h3>
                <button type="button" class="btn btn-primary" onclick="abrirModalEndereco()">Novo Endereço</button>
            </div>
            <div class="card-body">
                <div class="loading" id="enderecos-loading">Carregando endereços...</div>
                <table class="table" id="enderecos-table" style="display: none;">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>CEP</th>
                            <th>Logradouro</th>
                            <th>Cidade</th>
                            <th>Estado</th>
                            <th>Usuário</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody id="enderecos-tbody">
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    
</div>



    <!-- Modal Usuário -->
    <div id="modalUsuario" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title">Novo Usuário</h4>
                <button type="button" class="close" onclick="fecharModalUsuario()">&times;</button>
            </div>
            <form id="usuarioForm" onsubmit="cadastrarUsuario(event)">
                <div class="form-group">
                    <label for="usuarioNome">Nome:</label>
                    <input type="text" id="usuarioNome" class="form-control" required>
                </div>
                
                <div class="form-group">
                    <label for="usuarioEmail">Email:</label>
                    <input type="email" id="usuarioEmail" class="form-control" required>
                </div>
                
                <div class="form-group">
                    <label for="usuarioSenha">Senha:</label>
                    <input type="password" id="usuarioSenha" class="form-control" required minlength="6">
                </div>
                
                <div class="form-group">
                    <label for="usuarioConfirmarSenha">Confirmar Senha:</label>
                    <input type="password" id="usuarioConfirmarSenha" class="form-control" required minlength="6">
                </div>
                
                <div class="form-group">
                    <label for="usuarioRole">Tipo de Usuário:</label>
                    <select id="usuarioRole" class="form-control" required>
                        <option value="ROLE_USER">Usuário</option>
                        <option value="ROLE_ADMIN">Administrador</option>
                    </select>
                </div>
                <hr>
                <h5>Endereço</h5>

                <div class="form-group">
                    <label for="usuarioCep">CEP:</label>
                    <input type="text" id="usuarioCep" class="form-control">
                </div>

                <div class="form-group">
                    <label for="usuarioLogradouro">Logradouro:</label>
                    <input type="text" id="usuarioLogradouro" class="form-control">
                </div>

                <div class="form-group">
                    <label for="usuarioNumero">Número:</label>
                    <input type="text" id="usuarioNumero" class="form-control">
                </div>

                <div class="form-group">
                    <label for="usuarioComplemento">Complemento:</label>
                    <input type="text" id="usuarioComplemento" class="form-control">
                </div>

                <div class="form-group">
                    <label for="usuarioBairro">Bairro:</label>
                    <input type="text" id="usuarioBairro" class="form-control">
                </div>

                <div class="form-group">
                    <label for="usuarioCidade">Cidade:</label>
                    <input type="text" id="usuarioCidade" class="form-control">
                </div>

                <div class="form-group">
                    <label for="usuarioEstado">Estado:</label>
                    <input type="text" id="usuarioEstado" class="form-control">
                </div>
                <div class="text-right">
                    <button type="button" class="btn btn-secondary" onclick="fecharModalUsuario()">Cancelar</button>
                    <button type="submit" class="btn btn-primary">Cadastrar</button>
                </div>
            </form>
        </div>
    </div>

    <!-- Modal Endereço -->
    <div id="modalEndereco" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="modalEnderecoTitle">Novo Endereço</h4>
                <button type="button" class="close" onclick="fecharModalEndereco()">&times;</button>
            </div>
            <form id="enderecoForm" onsubmit="salvarEndereco(event)">
                <input type="hidden" id="enderecoId" name="id">
                
                <div class="form-group">
                    <label for="enderecoCep">CEP:</label>
                    <input type="text" id="enderecoCep" name="cep" class="form-control" placeholder="00000-000" required onblur="buscarCep()">
                </div>
                
                <div class="form-group">
                    <label for="enderecoLogradouro">Logradouro:</label>
                    <input type="text" id="enderecoLogradouro" name="logradouro" class="form-control" required>
                </div>
                
                <div class="form-group">
                    <label for="enderecoNumero">Número:</label>
                    <input type="text" id="enderecoNumero" name="numero" class="form-control" required>
                </div>
                
                <div class="form-group">
                    <label for="enderecoComplemento">Complemento:</label>
                    <input type="text" id="enderecoComplemento" name="complemento" class="form-control">
                </div>
                
                <div class="form-group">
                    <label for="enderecoBairro">Bairro:</label>
                    <input type="text" id="enderecoBairro" name="bairro" class="form-control" required>
                </div>
                
                <div class="form-group">
                    <label for="enderecoCidade">Cidade:</label>
                    <input type="text" id="enderecoCidade" name="cidade" class="form-control" required>
                </div>
                
                <div class="form-group">
                    <label for="enderecoEstado">Estado:</label>
                    <input type="text" id="enderecoEstado" name="estado" class="form-control" required>
                </div>
                
                <div class="form-group">
                    <label for="enderecoUsuario">Usuário:</label>
                    <input type="text" id="enderecoUsuario" name="usuarioId" class="form-control" required>
                </div>
                
                <div class="text-right">
                    <button type="button" class="btn btn-secondary" onclick="fecharModalEndereco()">Cancelar</button>
                    <button type="submit" class="btn btn-primary">Salvar</button>
                </div>
            </form>
        </div>
    </div>

    <script src="/js/auth.js"></script>
    <script src="/js/dashboard.js"></script>
    <script src="/js/usuarios.js"></script>
    <script src="/js/endereco.js"></script>
</body>
</html>

