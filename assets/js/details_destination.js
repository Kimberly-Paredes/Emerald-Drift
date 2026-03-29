// Esto rellena detalles_destinos con los datos del destino seleccionado
if (document.getElementById('dest-name')) {
    const params = new URLSearchParams(window.location.search);
    const id = Number(params.get('id'));
    const destinations = JSON.parse(localStorage.getItem('destinations')) || [];
    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    const count = bookings.filter(r => r.destinationId === id).length;
    const destination = destinations.find(d => d.id === id);

    if (destination) {
        document.getElementById('dest-title').textContent = `Details about ${destination.destinationName}`;
        document.getElementById('dest-name').textContent = destination.destinationName;
        document.getElementById('dest-country').textContent = destination.country;
        document.getElementById('dest-price').textContent = destination.price + '€';
        document.getElementById('dest-passport').textContent = destination.passport ? 'Yes' : 'No';
        document.getElementById('dest-description').textContent = destination.description;
        document.getElementById('booking').textContent = `Total booked: ${count}`;
    }
}