// APARTADO PARA RENDERIZAR EL LOCAL STORAGE CON LOS USUARIOS

// Creamos una constante que contenga la referencia a la tabla en la que irán almacenados los usuarios
const users_table = document.getElementById('users-tbody');

// Obtenemos el array de objetos (usuarios) si existe, caso contrario creamos un array
const users = JSON.parse(localStorage.getItem('users')) || [];

// Función que renderiza la tabla con el array de usuarios que se le pase
function renderUsers(list) {
    // Si no hay usuarios creados lo mostrará la tabla
    if (list.length === 0) {
        users_table.innerHTML = `<tr><td colspan="11"><div class="ls-empty">No users registered yet</div></td></tr>`;

        // Si hay usuarios registrados, con el map itera por el array y lo muestra en la tabla
    } else {
        users_table.innerHTML = list.map(u => `
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
                <td><button class="button" style="background-color: #195637" onclick="window.location.href='crear_usuario.html?id=${u.id}'">Change</button></td>
                <!-- Llama la función de deleteUser() -->
                <td><button class="button" style="background-color: #561927" onclick="deleteUser(${u.id})">Delete</button></td>
            </tr>
        `).join('');
    }
}

// Función que devuelve el array de usuarios ordenado o filtrado según la opción seleccionada
function getSortedUsers(sort) {
    // Creamos una copia del array para no modificar el original
    const list = [...users];
    switch (sort) {
        // Ordena alfabéticamente por nombre de A a Z
        case 'name-asc':     return list.sort((a, b) => a.name.localeCompare(b.name));
        // Ordena alfabéticamente por nombre de Z a A
        case 'name-desc':    return list.sort((a, b) => b.name.localeCompare(a.name));
        // Filtra y muestra solo los usuarios que tienen pasaporte
        case 'passport-yes': return list.filter(u => u.identification);
        // Filtra y muestra solo los usuarios que no tienen pasaporte
        case 'passport-no':  return list.filter(u => !u.identification);
        // Por defecto devuelve el array sin modificar
        default:             return list;
    }
}

// Renderizamos la tabla inicialmente con todos los usuarios
renderUsers(users);

// Escuchamos los cambios en el selector de ordenación y volvemos a renderizar la tabla
document.getElementById('user-sort').addEventListener('change', function () {
    renderUsers(getSortedUsers(this.value));
});

// Para que se pueda acceder a la función, debe estar en el scope global de window
window.deleteUser = function (id) {
    // Obtenemos el array de usuarios o inicializamos uno nuevo
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Creamos un nuevo array que contenga todos los ids, a excepción del id del usuario que pulsó el botón
    const updated = users.filter(u => u.id !== id);

    // Actualizamos el array accediendo a la clave
    localStorage.setItem('users', JSON.stringify(updated));

    // Si el usuario ha hecho una reserva, obtenemos bookings, eliminamos la reserva que se hizo con el id del usuario a eliminar
    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    localStorage.setItem('bookings', JSON.stringify(bookings.filter(b => Number(b.userId) !== Number(id))));

    // Hacemos que actualice la página cuando elimine el usuario
    location.reload();
}

// APARTADO PARA RENDERIZAR EL LOCAL STORAGE CON LOS DESTINOS

// Creamos una constante con referencia al contenedor que se utilizará para las cards con los destinos
const destinations_container = document.getElementById('destinations');

// Obtenemos los destinos guardados en local storage, si no inicializamos un array vacío
const destinations = JSON.parse(localStorage.getItem('destinations')) || [];

// Función que renderiza las cards con el array de destinos que se le pase
function renderDestinations(list) {
    // Si el array no contiene ningún destino, lo mostrará en el documento de listados
    if (list.length === 0) {
        destinations_container.innerHTML = `<div class="ls-empty-cards">No destinations added yet</div>`;
    } else {
        destinations_container.innerHTML = list.map(d => `
            <div class="dest-card" onclick="window.location.href='detalles_destino.html?id=${d.id}'">
                <p class="dest-region">${d.country}</p>
                <h3 class="dest-name">${d.destinationName}</h3>
                <p class="dest-desc">Price: ${d.price}€</p>
                <p class="dest-desc">Passport required: ${d.passport ? 'Yes' : 'No'}</p>
            </div>
        `).join('');
    }
}

// Función que devuelve el array de destinos ordenado según la opción seleccionada
function getSortedDestinations(sort) {
    // Creamos una copia del array para no modificar el original
    const list = [...destinations];
    switch (sort) {
        // Ordena alfabéticamente por nombre de A a Z
        case 'name-asc':  return list.sort((a, b) => a.destinationName.localeCompare(b.destinationName));
        // Ordena alfabéticamente por nombre de Z a A
        case 'name-desc': return list.sort((a, b) => b.destinationName.localeCompare(a.destinationName));
        // Ordena por precio de menor a mayor
        case 'price-asc': return list.sort((a, b) => a.price - b.price);
        // Ordena por precio de mayor a menor
        case 'price-desc': return list.sort((a, b) => b.price - a.price);
        // Por defecto devuelve el array sin modificar
        default:          return list;
    }
}

// Si el array no contiene ningún destino, lo mostrará en el documento de listados
if (destinations_container) {
    // Renderizamos las cards inicialmente con todos los destinos
    renderDestinations(destinations);

    // Escuchamos los cambios en el selector de ordenación y volvemos a renderizar las cards
    document.getElementById('dest-sort').addEventListener('change', function () {
        renderDestinations(getSortedDestinations(this.value));
    });
}