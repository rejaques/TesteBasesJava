const apiEnderecos = 'http://localhost:8080/api/enderecos';
let enderecoEmEdicao = null;

function carregarEnderecos(usuarioId) {
    e.preventDefault();
    fetch(`/api/enderecos/usuario/${usuarioId}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(res => res.json())
    .then(data => {
        const tbody = document.getElementById('enderecos-tbody');
        tbody.innerHTML = '';

        if (data.length === 0) {
            document.getElementById('enderecos-loading').innerText = 'Nenhum endereço encontrado.';
            document.getElementById('enderecos-table').style.display = 'none';
            return;
        }

        data.forEach(endereco => {
            const tr = document.createElement('tr');

            tr.innerHTML = `
                <td>${endereco.id}</td>
                <td>${endereco.cep}</td>
                <td>${endereco.logradouro}</td>
                <td>${endereco.cidade}</td>
                <td>${endereco.estado}</td>
                <td>${endereco.usuario ? endereco.usuario.nome : 'N/A'}</td>
                <td>
                    <button class="btn btn-sm btn-info" onclick="editarEndereco(${endereco.id})">Editar</button>
                    <button class="btn btn-sm btn-danger" onclick="deletarEndereco(${endereco.id})">Excluir</button>
                </td>
            `;

            tbody.appendChild(tr);
        });

        document.getElementById('enderecos-loading').style.display = 'none';
        document.getElementById('enderecos-table').style.display = 'table';
    })
    .catch(err => {
        console.error(err);
        document.getElementById('enderecos-loading').innerText = 'Erro ao carregar endereços.';
    });
}


function abrirModalEndereco(id = null, cep = '', logradouro = '', cidade = '', estado = '', usuarioId = '') {
    enderecoEmEdicao = id;
    document.getElementById('enderecoId').value = id || '';
    document.getElementById('enderecoCep').value = cep;
    document.getElementById('enderecoLogradouro').value = logradouro;
    document.getElementById('enderecoCidade').value = cidade;
    document.getElementById('enderecoEstado').value = estado;
    document.getElementById('enderecoUsuario').value = usuarioId;
    document.getElementById('modalEndereco').style.display = 'block';
}

function fecharModalEndereco() {
    enderecoEmEdicao = null;
    document.getElementById('modalEndereco').style.display = 'none';
}

function salvarEndereco(event) {
    event.preventDefault();

    const id = document.getElementById('enderecoId').value;
    const cep = document.getElementById('enderecoCep').value;
    const logradouro = document.getElementById('enderecoLogradouro').value;
    const cidade = document.getElementById('enderecoCidade').value;
    const estado = document.getElementById('enderecoEstado').value;
    const usuarioId = document.getElementById('enderecoUsuario').value;
    const bairro = document.getElementById('enderecoBairro').value;
    const numero = document.getElementById('enderecoNumero').value;

    const payload = {
        cep,
        logradouro,
        cidade,
        estado, 
        bairro,
        numero
    };

    const metodo = id ? 'PUT' : 'POST';
    const url = id ? `/api/enderecos/${id}` : `/api/enderecos/${usuarioId}`;

    fetch(url, {
        method: metodo,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(payload)
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('Erro ao salvar endereço');
        }
        return res.json();
    })
    .then(() => {
        fecharModalEndereco();
        carregarEnderecos(usuarioId);
    })
    .catch(err => {
        console.error(err);
        alert('Erro ao salvar endereço');
    });
}


async function deletarEndereco(id) {
    if (!confirm('Deseja realmente deletar esse endereço?')) {
        return;
    }

    const token = getToken();

    try {
        const response = await fetch(`${apiEnderecos}/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': 'Bearer ' + token }
        });

        if (response.ok) {
            alert('Endereço deletado com sucesso!');
            carregarEnderecos();
        } else {
            alert('Erro ao deletar endereço!');
        }
    } catch (error) {
        console.error(error);
        alert('Erro ao tentar deletar endereço!');
    }
}
