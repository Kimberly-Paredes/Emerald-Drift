// Dos destinos por defecto, requiere pasaporte y otro no
if (!localStorage.getItem('destinations')) {
    const defaultDestinations = [
        {
            id: 1,
            destinationName: 'Singapore',
            country: 'Singapore',
            price: 1200,
            description: 'A vibrant city-state where futuristic architecture meets lush greenery and incredible street food.',
            passport: true
        },
        {
            id: 2,
            destinationName: 'Stockholm',
            country: 'Sweden',
            price: 850,
            description: 'A stunning Scandinavian capital spread across 14 islands, known for its design, history and waterways.',
            passport: false
        }
    ];
    localStorage.setItem('destinations', JSON.stringify(defaultDestinations));
}

// Obtenemos el formulario con los datos del destino
const form = document.querySelector('form');

// Añadimos un event listener para que 'escuche' cuando el usuario haga click sobre el botón 'submit'
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Para evitar que la página se recargue

    // Obtenemos un array con objetos (los objetos son los destinos), si no existe, inicialiamos un array
    const destinations = JSON.parse(localStorage.getItem('destinations')) || [];

    // Creamos un ID para los destinos, funciona así: si creamos varios destinos y eliminamos uno de los primeros, el índice no será
    // reutilizado, si no continuará con el último índice asignado (se pierden índices)
    // Lo que hace el código es, si existen destinos, convierta en un array los IDs de los objetos dentro de
    // destination, y que escoja el mayor número (para empezar desde el final) y sumarle 1, si no asigna 1 (primer destino)
    const nextId = destinations.length > 0 ? Math.max(...destinations.map(d => d.id)) + 1 : 1;

    // Creamos un objeto 'destino' con la información sobre el destino
    const destination = {
        id: nextId,
        destinationName: document.getElementById('destination-name').value,
        country: document.getElementById('country').value,
        price: document.getElementById('price').value,
        description: document.getElementById('description').value,
        passport: document.getElementById('passport').checked,
    }

    // Añadimos el objeto al final del array
    destinations.push(destination);

    // Metemos el array con los destinos en el local storage, bajo otra clave 'destinations'
    localStorage.setItem('destinations', JSON.stringify(destinations));

    alert(`Destination created successfully.`);
    // Una vez guardados los destinos, nos redirigimos a la página con todos los listados
    window.location.href = 'listados.html';
})