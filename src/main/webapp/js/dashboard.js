let usuarios = [];
let editandoUsuario = null;
let paginaAtual = 0;
const tamanhoPagina = 5;

// Inicialização da página
document.addEventListener('DOMContentLoaded', function() {
    if (checkAuth()) {
        carregarDashboard();
    }
});

async function carregarDashboard() {
    await carregarUsuarios();
    await carregarUsuariosSelect();
    carregarNomeUsuario();
}

function carregarNomeUsuario() {
    const token = getToken();
    if (token) {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const userNameElement = document.getElementById('user-name');
            if (userNameElement) {
                userNameElement.textContent = payload.sub || 'Usuário';
            }
        } catch (error) {
            console.error('Erro ao decodificar token:', error);
        }
    }
}

//carregarUsuarios
async function carregarUsuarios(pagina = 0) {
    try {
        // Mostra loading
        document.getElementById('usuarios-loading').style.display = 'block';
        document.getElementById('usuarios-table').style.display = 'none';
        
        // Faz a requisição com parâmetros de paginação
        const response = await fetch(`${API_BASE}/usuarios?pagina=${pagina}&tamanho=${usuariosPorPagina}`, {
            headers: getAuthHeaders()
        });

        if (response.ok) {
            const data = await response.json();
            mostrarUsuarios(data.conteudo);
            atualizarPaginacao(data);
            paginaAtual = pagina;
        } else {
            throw new Error('Erro ao carregar usuários');
        }
    } catch (error) {
        alert(error.message);
    } finally {
        document.getElementById('usuarios-loading').style.display = 'none';
    }
}

function mostrarUsuarios(usuarios) {
    const tbody = document.getElementById('usuarios-tbody');
    tbody.innerHTML = '';

    usuarios.forEach(usuario => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${usuario.id}</td>
            <td>${usuario.nome}</td>
            <td>${usuario.email}</td>
            <td>${usuario.role.replace('ROLE_', '')}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editarUsuario(${usuario.id})">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="excluirUsuario(${usuario.id})">Excluir</button>
            </td>
        `;
        tbody.appendChild(row);
    });

    document.getElementById('usuarios-table').style.display = 'table';
}

function atualizarPaginacao(data) {
    const paginacao = document.getElementById('usuarios-paginacao');
    paginacao.innerHTML = '';

    // Botão Anterior
    const liAnterior = document.createElement('li');
    liAnterior.className = `page-item ${paginaAtual === 0 ? 'disabled' : ''}`;
    liAnterior.innerHTML = `<a class="page-link" href="#" onclick="carregarUsuarios(${paginaAtual - 1})">Anterior</a>`;
    paginacao.appendChild(liAnterior);

    // Botão Próximo
    const liProximo = document.createElement('li');
    liProximo.className = `page-item ${data.ultimaPagina ? 'disabled' : ''}`;
    liProximo.innerHTML = `<a class="page-link" href="#" onclick="carregarUsuarios(${paginaAtual + 1})">Próximo</a>`;
    paginacao.appendChild(liProximo);

    // Contador de páginas
    const liContador = document.createElement('li');
    liContador.className = 'page-item disabled';
    const totalPaginas = Math.ceil(data.totalElementos / usuariosPorPagina);
    liContador.innerHTML = `<span class="page-link">Página ${paginaAtual + 1} de ${totalPaginas}</span>`;
    paginacao.appendChild(liContador);
}



function renderizarUsuarios(data) {
    const tbody = document.getElementById('usuarios-tbody');
    tbody.innerHTML = '';

    data.conteudo.forEach(usuario => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${usuario.id}</td>
            <td>${usuario.nome}</td>
            <td>${usuario.email}</td>
            <td>${usuario.role.replace('ROLE_', '')}</td>
            <td>${new Date(usuario.dataCriacao).toLocaleDateString()}</td>
            <td>
                <button class="btn btn-sm btn-warning" onclick="editarUsuario(${usuario.id})">
                    <i class="bi bi-pencil"></i> Editar
                </button>
                <button class="btn btn-sm btn-danger" onclick="excluirUsuario(${usuario.id})">
                    <i class="bi bi-trash"></i> Excluir
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });

    document.getElementById('usuarios-table').style.display = 'table';
}

function atualizarControlesPaginacao(data) {
    const paginacao = document.getElementById('usuarios-paginacao');
    paginacao.innerHTML = '';

    // Botão Anterior
    const liAnterior = document.createElement('li');
    liAnterior.className = `page-item ${data.primeiraPagina ? 'disabled' : ''}`;
    liAnterior.innerHTML = `
        <a class="page-link" href="#" onclick="carregarUsuarios(${paginaAtual - 1})">
            &laquo; Anterior
        </a>
    `;
    paginacao.appendChild(liAnterior);

    // Números de página
    const totalPaginas = Math.ceil(data.totalElementos / tamanhoPagina);
    for (let i = 0; i < totalPaginas; i++) {
        const li = document.createElement('li');
        li.className = `page-item ${i === paginaAtual ? 'active' : ''}`;
        li.innerHTML = `
            <a class="page-link" href="#" onclick="carregarUsuarios(${i})">
                ${i + 1}
            </a>
        `;
        paginacao.appendChild(li);
    }

    // Botão Próximo
    const liProximo = document.createElement('li');
    liProximo.className = `page-item ${data.ultimaPagina ? 'disabled' : ''}`;
    liProximo.innerHTML = `
        <a class="page-link" href="#" onclick="carregarUsuarios(${paginaAtual + 1})">
            Próximo &raquo;
        </a>
    `;
    paginacao.appendChild(liProximo);
}

async function carregarUsuariosSelect() {
    const select = document.getElementById('enderecoUsuario');
    if (!select) return; // se select não existir, evita erro

    select.innerHTML = '<option value="">Selecione um usuário...</option>';

    usuarios.forEach(usuario => {
        const option = document.createElement('option');
        option.value = usuario.id;
        option.textContent = `${usuario.nome} (${usuario.email})`;
        select.appendChild(option);
    });
}

function abrirModalUsuario(id = null) {
    editandoUsuario = id;
    const modal = document.getElementById('modalUsuario');
    const title = document.getElementById('modalUsuarioTitle');
    const form = document.getElementById('usuarioForm');
    const senhaInput = document.getElementById('usuarioSenha');

    form.reset();

    if (id) {
        title.textContent = 'Editar Usuário';
        const usuario = usuarios.find(u => u.id === id);
        if (usuario) {
            document.getElementById('usuarioId').value = usuario.id;
            document.getElementById('usuarioNome').value = usuario.nome;
            document.getElementById('usuarioEmail').value = usuario.email;
            document.getElementById('usuarioRole').value = usuario.role;

            // Tornar senha opcional na edição
            senhaInput.required = false;
            senhaInput.placeholder = 'Deixe em branco para manter a senha atual';
        }
    } else {
        title.textContent = 'Novo Usuário';
        senhaInput.required = true;
        senhaInput.placeholder = 'Digite a senha';
    }

    modal.classList.add('show');
}

function fecharModalUsuario() {
    const modal = document.getElementById('modalUsuario');
    modal.classList.remove('show');
    editandoUsuario = null;
}

async function salvarUsuario(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const userData = {
        nome: formData.get('nome'),
        email: formData.get('email'),
        role: formData.get('role')
    };

    // Só incluir senha se foi preenchida
    const senha = formData.get('senha');
    if (senha) {
        userData.senha = senha;
    }

    try {
        let response;

        if (editandoUsuario) {
            userData.id = editandoUsuario;
            response = await fetch(`${API_BASE}/usuarios/${editandoUsuario}`, {
                method: 'PUT',
                headers: {
                    ...getAuthHeaders(),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
        } else {
            response = await fetch(`${API_BASE}/usuarios`, {
                method: 'POST',
                headers: {
                    ...getAuthHeaders(),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
        }

        if (response.ok) {
            showAlert(`Usuário ${editandoUsuario ? 'atualizado' : 'criado'} com sucesso!`, 'success');
            fecharModalUsuario();
            await carregarUsuarios();
            await carregarUsuariosSelect();
        } else {
            const errorData = await response.json();
            showAlert(errorData.message || 'Erro ao salvar usuário', 'danger');
        }
    } catch (error) {
        console.error('Erro ao salvar usuário:', error);
        showAlert('Erro ao salvar usuário', 'danger');
    }
}

function editarUsuario(id) {
    abrirModalUsuario(id);
}

async function excluirUsuario(id) {
    if (!confirm('Tem certeza que deseja excluir este usuário?')) {
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/usuarios/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });

        if (response.ok) {
            showAlert('Usuário excluído com sucesso!', 'success');
            await carregarUsuarios();
            await carregarUsuariosSelect();
        } else {
            const errorData = await response.json();
            showAlert(errorData.message || 'Erro ao excluir usuário', 'danger');
        }
    } catch (error) {
        console.error('Erro ao excluir usuário:', error);
        showAlert('Erro ao excluir usuário', 'danger');
    }
}

    // Adicione no início do arquivo (escopo global)
function abrirModalUsuario() {
    const modal = document.getElementById('modalUsuario');
    modal.style.display = 'block';
    
    // Resetar formulário
    document.getElementById('usuarioForm').reset();
    
    // Configurar para novo usuário
    document.getElementById('usuarioSenha').required = true;
    document.getElementById('usuarioConfirmarSenha').required = true;
}

function fecharModalUsuario() {
    document.getElementById('modalUsuario').style.display = 'none';
}

async function cadastrarUsuario(event) {
    event.preventDefault();
    
    const nome = document.getElementById('usuarioNome').value;
    const email = document.getElementById('usuarioEmail').value;
    const senha = document.getElementById('usuarioSenha').value;
    const confirmarSenha = document.getElementById('usuarioConfirmarSenha').value;
    const role = document.getElementById('usuarioRole').value;

    // Validação
    if (senha !== confirmarSenha) {
        showAlert('As senhas não coincidem', 'danger');
        return;
    }

    try {
        showLoading(true);
        
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ nome, email, senha, role })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Erro ao cadastrar usuário');
        }

        showAlert('Usuário cadastrado com sucesso!', 'success');
        fecharModalUsuario();
        await carregarUsuarios();
    } catch (error) {
        showAlert(error.message, 'danger');
    } finally {
        showLoading(false);
    }
}


// Carrega os usuários quando a página é aberta
document.addEventListener('DOMContentLoaded', function() {
    if (checkAuth()) {
        carregarUsuarios();
    }
});
