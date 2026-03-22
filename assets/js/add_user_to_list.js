// Creamos una constante que contenga la referencia al formulario
const users_table = document.getElementById('users-tbody');

// Obtenemos el array de objetos (usuarios) si existe, caso contrario creamos un array
const users = JSON.parse(localStorage.getItem('users')) || [];

// Si no hay usuarios creados lo mostrará la tabla
if (users.length === 0) {
    users_table.innerHTML = `<tr><td colspan="11"><div class="ls-empty">No users registered yet</div></td></tr>`;

    // Si hay usuarios registrados, con el map itera por el array y lo muestra en la tabla
} else {
    users_table.innerHTML = users.map(u => `
        <tr>
            <td>${u.id}</td>
            <td>${u.name}</td>
            <td>${u.surname}</td>
            <td>${u.age}</td>
            <td>${u.email}</td>
            <td>${u.phone}</td>
            <td>${u.identification}</td>
            <td>${u.expirationCountry}</td>
            <td>${u.expiryDate}</td>
            <!--Al pulsar sobre el botón de 'Change', redirige a la página de creación de usuario, junto con su id (para hacer referencia al usuario específico) -->
            <td><button class="button" style="background-color: #195637" onclick="window.location.href='/Proyecto-Web/pages/crear_usuario.html?id=${u.id}'">Change</button></td> 
            <!-- Llama la función de deleteUser() -->
            <td><button class="button" style="background-color: #561927" onclick="deleteUser(${u.id})">Delete</button></td>
        </tr>
    `).join('');
}

// Para que se pueda acceder a la función, debe estar en el scope global de window
window.deleteUser = function(id) {
    // Obtenemos el array de usuarios o inicializamos uno nuevo
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Creamos un nuevo array que contenga todos los ids, a excepción del id del usuario que pulsó el botón
    const updated = users.filter(u => u.id !== id);

    // Actualizamos el array accediendo a la clave
    localStorage.setItem('users', JSON.stringify(updated));

    // Hacemos que actualice la página cuando elimine el usuario
    location.reload();
}