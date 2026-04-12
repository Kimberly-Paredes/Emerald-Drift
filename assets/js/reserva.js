// Obtenemos los usuarios (si los hay)
const users = JSON.parse(localStorage.getItem('users')) || [];

// Obtenemos los destinos (si los hay)
const destinations = JSON.parse(localStorage.getItem('destinations')) || [];

// Obtenemos el ID que contendrá los usuarios
const userSelect = document.getElementById('user');

// Obtenemos el ID que contendrá los destinos
const destSelect = document.getElementById('destination');

// Obtenemos la advertencia del pasaporte
const warning = document.getElementById('passport-warning');

// Función para iterar sobre el array de usuarios y destinos y crear 'las opciones' del despliegue
function populateSelect(select, items, variable) {
    items.forEach(item => {
        const option = document.createElement('option');
        option.value = item.id;
        option.textContent = variable(item);
        select.appendChild(option);
    });
}

// Hace que la lista desplegable tenga el nombre del usuario y además indique si tiene pasaporte o no
populateSelect(userSelect, users, u =>
    `${u.name} ${u.surname} - ${u.identification ? 'Has passport' : 'No passport'}`
);

// Hace que la lista desplegable tenga el nombre del destino y además indique si requiere pasaporte o no
populateSelect(destSelect, destinations, d =>
    `${d.destinationName} - ${d.passport ? 'Passport required' : 'No passport required'}`
);

// Obtenemos el botón del submit de reserva
const submitBtn = document.querySelector('button[type="submit"]');

// Función que comprueba los pasaportes (si el user tiene pasaporte para un destino que lo requiera)
function checkPassport() {
    // Obtiene el usuario seleccionado (el usuario actual)
    const user = users.find(u => u.id === Number(userSelect.value));

    // Obtiene el destino seleccionado (el destino actual)
    const destination = destinations.find(d => d.id === Number(destSelect.value));

    // En el caso de que ambos están seleccionados
    if (user && destination) {
        // Devuelve verdadero si el destino requiere pasaporte y no lo tiene
        const blocked = destination.passport && !user.identification;

        // Si blocked es True el warning pasa a ser 'block' (visible)
        warning.style.display = blocked ? 'block' : 'none';

        // El botón se deshabilita (no se podrá hacer una reserva)
        submitBtn.disabled = blocked;
    }
}

// Añadimos un evento que llamará la función de comprobación de pasaporte cada vez que selecciona una opción de la lista
userSelect.addEventListener('change', checkPassport);
destSelect.addEventListener('change', checkPassport);

// Añadimos otro evento que se ejecuta cuando el usuario lo envía
document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault(); // evita que se recargue

    // Obtiene el usuario actual
    const user = users.find(u => u.id === Number(userSelect.value));

    // Obtiene el destino actual
    const destination = destinations.find(d => d.id === Number(destSelect.value));

    // Si el usuario no tiene pasaporte para un destino que lo requiera, salimos (no devuelve nada)
    if (destination.passport && !user.identification) {
        warning.style.display = 'block';
        return;
    }

    // Obtenemos las reservas si existen
    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];

    // COMPROBACIÓN DE EXISTENCIA DE DUPLICADOS
    // Obtenemos la fecha de la reserva
    const date = document.getElementById('date').value;

    // Buscamos si ya existe una reserva con ese usuario, ese destino y la misma fecha
    const duplicate = bookings.find(b =>
        Number(b.userId) === user.id &&
        Number(b.destinationId) === destination.id &&
        b.date === date
    );

    // Si encontró, lanzará un alert informando eso al usuario
    if (duplicate) {
        alert('A booking with the same user, destination and date already exists.');
        return;
    }

    // El ID de las reservas se calcula a partir del máximo id en el array
    const nextId = bookings.length > 0 ? Math.max(...bookings.map(r => r.id)) + 1 : 1;

    // Metemos la reserva en el array de reservas
    bookings.push({
        id: nextId,
        userId: user.id,
        destinationId: destination.id,
        date: document.getElementById('date').value
    });

    // Lo subimos a local storage
    localStorage.setItem('bookings', JSON.stringify(bookings));

    alert(`You booked a trip correctly!`)

    window.location.href = `detalles_destino.html?id=${destination.id}`;
});