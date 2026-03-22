// Buscamos los parámetros de la URL, si existen (?número_ID)
// Después, el URLSearchParams lo parsea para poder operar con los valores individuales, en este caso, el ID
const params = new URLSearchParams(window.location.search);

// Obtiene el ID y lo pasa de string a número
const editId = Number(params.get('id'));

// Si el ID existe, significa que nos han redirigido de la página de listados para modificar los valores del usuario
if (editId) {
    // Obtenemos el array de usuarios o inicializamos uno
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Buscamos el usuario por su ID dentro del array de usuarios
    const user = users.find(u => u.id === editId);

    // Si lo encuentra, rellena el formulario con los datos almacenados en el local storage
    if (user) {
        document.getElementById('name').value = user.name;
        document.getElementById('surname').value = user.surname;
        document.getElementById('email').value = user.email;
        document.getElementById('age').value = user.age;
        document.getElementById('phone').value = user.phone;
        document.getElementById('id-number').value = user.identification;
        document.getElementById('expiration-country').value = user.expirationCountry;
        document.getElementById('expiration-date').value = user.expiryDate;
    }
}

// Obtenemos el formulario
const form = document.querySelector('form');

// Si lo obtenemos, añadimos un event listener, para que 'escuche' cuando el usuario pulse el botón 'submit'
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Para evitar que se recargue

        // Creamos un objeto con todos los datos del usuario
        const user = {
            id: editId || Date.now(),
            name: document.getElementById('name').value,
            surname: document.getElementById('surname').value,
            email: document.getElementById('email').value,
            age: document.getElementById('age').value,
            phone: document.getElementById('phone').value,
            identification: document.getElementById('id-number').value,
            expirationCountry: document.getElementById('expiration-country').value,
            expiryDate: document.getElementById('expiration-date').value
        };

        // Obtenemos el array de usuarios o inicializamos uno
        const users = JSON.parse(localStorage.getItem('users')) || [];

        // Comprobamos si un usuario ya existe en la lista
        const existingIndex = users.findIndex(u => u.id === user.id);

        // Si encontró una coincidencia, lo sobreescribe
        if (existingIndex !== -1) {
            users[existingIndex] = user;
        } else {
            users.push(user); // Añade un usuario nuevo al final del array
        }

        // Añade el array al local storage
        localStorage.setItem('users', JSON.stringify(users));

        // Redirige a la página de listados
        window.location.href = '/Proyecto-Web/pages/listados.html';
    });
}