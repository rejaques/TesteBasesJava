const API_BASE = '/api';
const AUTH_API = API_BASE + '/auth';

// Utilitários
function getToken() {
    return localStorage.getItem('token');
}

function setToken(token) {
    localStorage.setItem('token', token);
}

function removeToken() {
    localStorage.removeItem('token');
}

function getAuthHeaders() {
    const token = getToken();
    return {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
    };
}

function showAlert(message, type = 'info') {
    const alertContainer = document.getElementById('alert-container');
    if (!alertContainer) return;
    
    alertContainer.innerHTML = `
        <div class="alert alert-${type}">
            ${message}
        </div>
    `;
    
    setTimeout(() => {
        alertContainer.innerHTML = '';
    }, 5000);
}

function showLoading(elementId, show = true) {
    const element = document.getElementById(elementId);
    if (element) {
        if (show) {
            element.classList.add('show');
        } else {
            element.classList.remove('show');
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loginBtn').addEventListener('click', fazerLogin);
    e.preventDefault();
});

async function fazerLogin(event) {
    event.preventDefault();
    
    // 1. Mostre que a função está sendo chamada
    console.log("Função fazerLogin chamada");
    
    try {
        // 2. Verifique os valores antes de enviar
        const email = document.getElementById('email').value;
        const password = document.getElementById('senha').value;
        console.log("Enviando:", {email, senha});

        // 3. Faça a requisição com tratamento de erro
        const response = await fetch('http://localhost:8080/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ 
            email: document.getElementById('email').value,
            senha: document.getElementById('senha').value
        })
        });

        console.log("Resposta recebida, status:", response.status);

        if (!response.ok) {
            const error = await response.text();
            throw new Error(error || 'Erro no login');
        }

        const data = await response.json();
        console.log("Token recebido:", data.token);
        
        if (data.token) {
            localStorage.setItem('token', data.token);
            window.location.href = '/dashboard';
        }
    } catch (error) {
        console.error("Erro completo:", error);
        alert("Erro: " + error.message);
    }
}

async function fazerRegistro(event) {
    event.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmarSenha').value;
    
    if (senha !== confirmarSenha) {
        showAlert('As senhas não coincidem', 'danger');
        return;
    }
    
    const registerText = document.getElementById('register-text');
    const registerLoading = document.getElementById('register-loading');
    
    try {
        registerText.style.display = 'none';
        showLoading('register-loading', true);
        
        const response = await fetch(AUTH_API + '/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome, email, senha })
        });
        
        if (response.ok) {
            showAlert('Conta criada com sucesso! Redirecionando para login...', 'success');
            
            setTimeout(() => {
                window.location.href = '/login';
            }, 2000);
        } else {
            const errorData = await response.json();
            showAlert(errorData.message || 'Erro ao criar conta', 'danger');
        }
    } catch (error) {
        console.error('Erro no registro:', error);
        showAlert('Erro ao criar conta. Tente novamente.', 'danger');
    } finally {
        registerText.style.display = 'inline';
        showLoading('register-loading', false);
    }
}

function logout() {
    removeToken();
    showAlert('Logout realizado com sucesso!', 'success');
    
    setTimeout(() => {
        window.location.href = '/login';
    }, 1000);
}



