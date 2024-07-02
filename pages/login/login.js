const urlUsers = "https://6678a3bf0bd45250561f5768.mockapi.io/EcommerceTheMusicHouse/login";
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch(urlUsers);
        const users = await response.json();
        localStorage.setItem('users', JSON.stringify(users));
    } catch (error) {
        console.error('Error al cargar usuarios', error);
    }

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        await login();
    });
});

async function login() {
    const email = emailInput.value;
    console.log("valor de email", email)
    const password = passwordInput.value;
    console.log("valor de email", password)
    const btnNuevoProduct = document.getElementById('btnNuevoProduct');
    // Obtener y verificar si hay usuarios almacenados
    const users = JSON.parse(localStorage.getItem('users'));
    if (!users) {
        showError('No hay usuarios registrados');
        return;
    }

    // Buscar el usuario por correo electrónico
    const user = users.find(user => user.email === email);
    if (!user) {
        showError('Correo o Contraseña incorrecto');
        return;
    }

    // Verificar la contraseña
    if (user.password !== password) {
        showError('Correo o Contraseña incorrecto');
        return;
    }


    // Login exitoso, establecer el rol y redirigir según el rol
    if (user.roll === 'admin') {
        localStorage.setItem('roll', 'admin');
        window.location.href = '../addproduct.html';
    } else {
        localStorage.setItem('roll', 'user');
        window.location.href = '../../index.html';
    }
}
function showError(message) {
    const messageElement = document.getElementById('message');
    messageElement.textContent = message;
}
