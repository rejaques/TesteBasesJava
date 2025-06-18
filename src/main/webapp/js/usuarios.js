const apiUsuarios = 'http://localhost:8080/api/usuarios';
let pagina = 1;
let usuarioEmEdicao = null;

function getToken() {
    return localStorage.getItem('token');
}

function logout() {
    localStorage.removeItem('token');
    window.location.href = 'login.jsp';
}

async function carregarUsuarios() {
    const token = getToken();

    const loading = document.getElementById('usuarios-loading');
    const table = document.getElementById('usuarios-table');
    const tbody = document.getElementById('usuarios-tbody');

    loading.style.display = 'block';
    table.style.display = 'none';

    try {
        const response = await fetch(`${apiUsuarios}?pagina=${pagina}`, {
            headers: { 'Authorization': 'Bearer ' + token }
        });

        if (!response.ok) {
            throw new Error('Erro na requisição');
        }

        const data = await response.json();

        tbody.innerHTML = '';

        data.conteudo.forEach(usuario => {
            const linha = document.createElement('tr');
            linha.innerHTML = `
                <td>${usuario.id}</td>
                <td>${usuario.nome}</td>
                <td>${usuario.email}</td>
                <td>${usuario.role.replace('ROLE_', '')}</td>
                <td>
                    <button class="btn btn-sm btn-primary" onclick="abrirModalUsuario(${usuario.id}, '${usuario.nome}', '${usuario.email}', '${usuario.role}')">
                        <i class="bi bi-pencil"></i> Editar
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="deletarUsuario(${usuario.id})">
                        <i class="bi bi-trash"></i> Excluir
                    </button>
                </td>
            `;
            tbody.appendChild(linha);
        });

        loading.style.display = 'none';
        table.style.display = 'table';
    } catch (error) {
        loading.innerText = 'Erro ao carregar usuários.';
        console.error(error);
        if (error.message.includes('403') || error.message.includes('401')) {
            logout();
        }
    }
}

function abrirModalUsuario(id = null, nome = '', email = '', role = 'USER') {
    usuarioEmEdicao = id;
    document.getElementById('usuarioNome').value = nome;
    document.getElementById('usuarioEmail').value = email;
    document.getElementById('usuarioRole').value = role;
    document.getElementById('usuarioSenha').value = '';
    document.getElementById('usuarioConfirmarSenha').value = '';
    document.getElementById('modalUsuario').style.display = 'block';
}

function fecharModalUsuario() {
    usuarioEmEdicao = null;
    document.getElementById('modalUsuario').style.display = 'none';
}

async function cadastrarUsuario(event) {
    event.preventDefault();

    const nome = document.getElementById('usuarioNome').value;
    const email = document.getElementById('usuarioEmail').value;
    const senha = document.getElementById('usuarioSenha').value;
    const confirmarSenha = document.getElementById('usuarioConfirmarSenha').value;
    const role = document.getElementById('usuarioRole').value;

    if (senha !== confirmarSenha && !usuarioEmEdicao) {
        alert('As senhas não conferem');
        return;
    }

    const payload = {
        nome,
        email,
        role
    };

    if (senha) payload.senha = senha;

    const metodo = usuarioEmEdicao ? 'PUT' : 'POST';
    const url = usuarioEmEdicao ? `${apiUsuarios}/${usuarioEmEdicao}` : apiUsuarios;

    const response = await fetch(url, {
        method: metodo,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getToken()
        },
        body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(usuario => {
        const id = usuarioEmEdicao || usuario.id;
        salvarEnderecoDoUsuario(id);
    })
    .catch(err => {
        console.error(err);
        alert('Erro ao salvar usuário');
    });
}

function salvarEnderecoDoUsuario(usuarioId) {
    const enderecoId = document.getElementById('enderecoId').value;
    const payload = {
        cep: document.getElementById('usuarioCep').value,
        logradouro: document.getElementById('usuarioLogradouro').value,
        numero: document.getElementById('usuarioNumero').value,
        complemento: document.getElementById('usuarioComplemento').value,
        bairro: document.getElementById('usuarioBairro').value,
        cidade: document.getElementById('usuarioCidade').value,
        estado: document.getElementById('usuarioEstado').value
    };

    const metodo = enderecoId ? 'PUT' : 'POST';
    const url = enderecoId ? `/api/enderecos/${enderecoId}` : `/api/enderecos/${usuarioId}`;

    fetch(url, {
        method: metodo,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(payload)
    })
    .then(res => {
        if (!res.ok) throw new Error('Erro ao salvar endereço');
        return res.json();
    })
    .then(() => {
        fecharModalUsuario();
        carregarUsuarios();
    })
    .catch(err => {
        console.error(err);
        alert('Erro ao salvar endereço');
    });
}

async function deletarUsuario(id) {
    if (!confirm('Deseja realmente deletar esse usuário?')) {
        return;
    }

    const token = getToken();

    try {
        const response = await fetch(`${apiUsuarios}/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': 'Bearer ' + token }
        });

        if (response.ok) {
            alert('Usuário deletado com sucesso!');
            carregarUsuarios();
        } else {
            alert('Erro ao deletar usuário!');
        }
    } catch (error) {
        console.error(error);
        alert('Erro ao tentar deletar usuário!');
    }
}

window.onload = carregarUsuarios;
