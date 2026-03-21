// Creamos una constante que contenga la referencia al formulario
const form = document.querySelector('form');

// Añadimos un event listener para 'escuchar' cuándo el usuario le da al botón 'submit'
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Para que no se recargue

    // Creamos un objeto 'user' para almacenar todos sus datos
    const user = {
        id: Date.now(),
        name: document.getElementById('name').value,
        surname: document.getElementById('surname').value,
        email: document.getElementById('email').value,
        age: document.getElementById('age').value,
        phone: document.getElementById('phone').value,
        identification: document.getElementById('id-number').value,
        expirationCountry: document.getElementById('expiration-country').value,
        expiryDate: document.getElementById('expiration-date').value
    }

    // Para poder crear múltiples usuarios, comprobamos si existe un array, sino, lo creamos
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Añadimos el usuario
    users.push(user);

    localStorage.setItem('users', JSON.stringify(users));

    console.log('Todos los usuarios:', users);
});