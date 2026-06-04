if (document.getElementById('dest-name')) {
    const params = new URLSearchParams(window.location.search);
    const id = Number(params.get('id'));
    const destinations = JSON.parse(localStorage.getItem('destinations')) || [];
    let bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    let users = JSON.parse(localStorage.getItem('users')) || [];

    const destinationBookings = bookings.filter(r => r.destinationId === id);
    const destination = destinations.find(d => d.id === id);

    if (destination) {
        document.getElementById('dest-title').textContent = `Details about ${destination.destinationName}`;
        document.getElementById('dest-name').textContent = destination.destinationName;
        document.getElementById('dest-country').textContent = destination.country;
        document.getElementById('dest-price').textContent = destination.price + '€';
        document.getElementById('dest-passport').textContent = destination.passport ? 'Yes' : 'No';
        document.getElementById('dest-description').textContent = destination.description;

        renderBookingsList();
    }

    function renderBookingsList() {
        bookings = JSON.parse(localStorage.getItem('bookings')) || [];
        users = JSON.parse(localStorage.getItem('users')) || [];

        const destinationBookings = bookings.filter(r => r.destinationId === id);
        const list = document.getElementById('bookings-list');
        list.innerHTML = '';

        if (destinationBookings.length === 0) {
            list.innerHTML = '<li>No bookings yet.</li>';
            return;
        }

        destinationBookings.forEach(booking => {
            const user = users.find(u => u.id === booking.userId);

            const li = document.createElement('li');
            li.style.cssText = 'display: flex; justify-content: space-between; align-items: center;';

            const info = document.createElement('span');
            info.textContent = user
                ? `${user.name} ${user.surname} (${user.email}) — ${booking.date}`
                : `Unknown user (ID: ${booking.userId}) — ${booking.date}`;

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.style.cssText = `
                background: transparent;
                border: 1px solid rgba(255,255,255,0.5);
                color: white;
                padding: 0.2rem 0.7rem;
                cursor: pointer;
                font-size: 0.8rem;
                border-radius: 4px;
            `;

            deleteBtn.addEventListener('click', () => deleteUser(booking.userId));

            li.appendChild(info);
            li.appendChild(deleteBtn);
            list.appendChild(li);
        });
    }

    function deleteUser(userId) {
        if (!confirm('Are you sure you want to delete this user and all their bookings?')) return;

        // Elimina el usuario
        let users = JSON.parse(localStorage.getItem('users')) || [];
        users = users.filter(u => u.id !== userId);
        localStorage.setItem('users', JSON.stringify(users));

        // Elimina todas sus reservas
        let bookings = JSON.parse(localStorage.getItem('bookings')) || [];
        bookings = bookings.filter(b => b.userId !== userId);
        localStorage.setItem('bookings', JSON.stringify(bookings));

        renderBookingsList();
    }
}