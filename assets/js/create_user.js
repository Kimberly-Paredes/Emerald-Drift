// Usuarios por defecto (uno tiene pasaporte y otro no)
if (!localStorage.getItem('users')) {
    const defaultUsers = [
        {
            id: 1,
            name: 'María',
            surname: 'García',
            email: 'maria@email.com',
            age: 34,
            phone: '612345678',
            identification: '44551122M',
            expirationCountry: 'Spain',
            expiryDate: '2028-06-15'
        },
        {
            id: 2,
            name: 'Carlos',
            surname: 'López',
            email: 'carlos@email.com',
            age: 28,
            phone: '698765432',
            identification: '',
            expirationCountry: '',
            expiryDate: ''
        }
    ];
    localStorage.setItem('users', JSON.stringify(defaultUsers));
}

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

        // Si el usuario ya tiene pasaporte, bloqueamos los campos
        if (user.identification) {
            document.getElementById('id-number').disabled = true;
            document.getElementById('expiration-country').disabled = true;
            document.getElementById('expiration-date').disabled = true;
        }
    }
}

// Obtenemos el formulario
const form = document.querySelector('form');

// Si lo obtenemos, añadimos un event listener, para que 'escuche' cuando el usuario pulse el botón 'submit'

form.addEventListener('submit', (e) => {
    e.preventDefault(); // Para evitar que se recargue

    // Comprobamos que el pasaporte no está caducado
    const identification = document.getElementById('id-number').value;
    const expiryDate = document.getElementById('expiration-date').value;

    if (identification && expiryDate && new Date(expiryDate) < new Date()) {
        alert('The passport expiration date is in the past.');
        return;
    }

    // Obtenemos el array de usuarios o inicializamos uno
    const users = JSON.parse(localStorage.getItem('users')) || [];

    const nextId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;

    // Creamos un objeto con todos los datos del usuario
    const user = {
        id: editId || nextId,
        name: document.getElementById('name').value,
        surname: document.getElementById('surname').value,
        email: document.getElementById('email').value,
        age: document.getElementById('age').value,
        phone: document.getElementById('phone').value,
        identification: identification,
        expirationCountry: expiryDate,
        expiryDate: document.getElementById('expiration-date').value
    };

    // Es necesario comprobar la existencia del usuario en el array (porque puede
    // ser que estamos modificando y no creando un usuario nuevo)
    const existingIndex = users.findIndex(u => u.id === user.id);

    // Si el usuario exite, lo modificamos
    if (existingIndex !== -1) {
        users[existingIndex] = user;
    } else {
        users.push(user); // Si no añadimos uno nuevo
    }

    // Añade el array al local storage
    localStorage.setItem('users', JSON.stringify(users));

    alert(`User added correctly!`)
    // Redirige a la página de listados
    window.location.href = 'listados.html';
});