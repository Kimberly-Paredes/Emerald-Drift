// APARTADO PARA RENDERIZAR EL LOCAL STORAGE CON LOS USUARIOS
// Explicación 1

// Creamos una constante que contenga la referencia a la tabla en la que irán almacenados los usuarios
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

// APARTADO PARA RENDERIZAR EL LOCAL STORAGE CON LOS DESTINOS

// creamos una constante con referencia al contenedor que se utilizará para las cards con los destinos
const destinations_container = document.getElementById('destinations');

// Obtenemos los destinos guardados en local storage, si no inicializamos un array vacío
const destinations = JSON.parse(localStorage.getItem('destinations')) || [];

// Si el array no contiene ningún destino, lo mostrará en el documento
if (destinations.length === 0) {
    destinations_container.innerHTML = `<div class="ls-empty-cards">No destinations added yet</div>`;

} else {
    destinations_container.innerHTML = destinations.map(d => `
        <div class="dest-card" onclick="toggleCard(this)">
            <p class="dest-region">${d.country}</p>
            <h3 class="dest-name">${d.destinationName}</h3>
            <p class="dest-desc">Price: ${d.price}€</p>
            <p class="dest-desc">Passport required: ${d.passport ? 'Yes' : 'No'}</p>
            
            <!--      Este será el contenedor que aparecerá cuando el usuario haga click sobre el contenedor principal      -->
            <div class="dest-details">
                <p class="dest-desc">${d.description}</p>
                <h4>Reservations</h4>
            <p class="dest-desc">No reservations yet</p>
        </div>
        </div>
    `).join('');
}

window.toggleCard = function(card) {
    card.classList.toggle('open');
}