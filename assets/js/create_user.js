if (!localStorage.getItem('users')) {
    const defaultUsers = [
        {
            id: 1,
            name: 'María',
            surname: 'García',
            email: 'maria@email.com',
            age: 34,
            phone: '612345678',
            identification: 'MAM123321',
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

const params = new URLSearchParams(window.location.search);
const editId = Number(params.get('id'));

if (editId) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.id === editId);

    if (user) {
        document.getElementById('name').value = user.name;
        document.getElementById('surname').value = user.surname;
        document.getElementById('email').value = user.email;
        document.getElementById('age').value = user.age;
        document.getElementById('phone').value = user.phone;
        document.getElementById('id-number').value = user.identification;
        document.getElementById('expiration-country').value = user.expirationCountry;
        document.getElementById('expiration-date').value = user.expiryDate;

        if (user.identification) {
            document.getElementById('id-number').disabled = true;
            document.getElementById('expiration-country').disabled = true;
            document.getElementById('expiration-date').disabled = true;
        }
    }
}

function getFields() {
    return {
        name: document.getElementById('name').value,
        surname: document.getElementById('surname').value,
        email: document.getElementById('email').value,
        age: document.getElementById('age').value,
        phone: document.getElementById('phone').value,
        identification: document.getElementById('id-number').value,
        expirationCountry: document.getElementById('expiration-country').value,
        expiryDate: document.getElementById('expiration-date').value
    };
}

function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    if (!field) return;

    field.classList.remove('input-success');
    field.classList.add('input-error');

    let errorEl = document.querySelector(`.error-message[data-for="${fieldId}"]`);
    if (!errorEl) {
        errorEl = document.createElement('span');
        errorEl.className = 'error-message';
        errorEl.dataset.for = fieldId;
        field.insertAdjacentElement('afterend', errorEl);
    }
    errorEl.textContent = message;
}

function showSuccess(fieldId) {
    const field = document.getElementById(fieldId);
    if (!field) return;

    field.classList.remove('input-error');
    field.classList.add('input-success');

    const errorEl = document.querySelector(`.error-message[data-for="${fieldId}"]`);
    if (errorEl) errorEl.remove();
}

function clearFieldState(fieldId) {
    const field = document.getElementById(fieldId);
    if (!field) return;

    field.classList.remove('input-error', 'input-success');

    const errorEl = document.querySelector(`.error-message[data-for="${fieldId}"]`);
    if (errorEl) errorEl.remove();
}

function clearAll() {
    ['name', 'surname', 'email', 'age', 'phone', 'id-number', 'expiration-country', 'expiration-date']
        .forEach(clearFieldState);
}

function validateFields(fields) {
    const errors = {};

    if (!fields.name.trim()) {
        errors.name = 'El nombre es obligatorio.';
    } else if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(fields.name.trim())) {
        errors.name = 'El nombre solo puede contener letras y espacios.';
    }

    if (!fields.surname.trim()) {
        errors.surname = 'Los apellidos son obligatorios.';
    } else if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(fields.surname.trim())) {
        errors.surname = 'Los apellidos solo pueden contener letras y espacios.';
    }

    if (!fields.email.trim()) {
        errors.email = 'El email es obligatorio.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) {
        errors.email = 'Introduce un email válido (ej: nombre@dominio.com).';
    }

    const age = Number(fields.age);
    if (fields.age.trim() === '') {
        errors.age = 'La edad es obligatoria.';
    } else if (!Number.isInteger(age) || age < 0 || age > 120) {
        errors.age = 'La edad debe ser un número entero entre 0 y 120.';
    }

    if (!fields.phone.trim()) {
        errors.phone = 'El teléfono es obligatorio.';
    } else if (!/^[6-9]\d{8}$/.test(fields.phone.trim())) {
        errors.phone = 'El teléfono debe tener 9 dígitos y empezar por 6, 7, 8 o 9.';
    }

    // Validación del pasaporte (campos opcionales pero interdependientes)
    if (fields.identification.trim()) {
        // Formato pasaporte español: 3 letras + 6 números (ej: ABC123456)
        if (!/^[A-Za-z]{3}\d{6}$/.test(fields.identification.trim())) {
            errors['id-number'] = 'El número de pasaporte debe tener el formato AAA000000 (3 letras y 6 números).';
        }

        if (!fields.expirationCountry.trim()) {
            errors['expiration-country'] = 'El país de expedición es obligatorio si se introduce un pasaporte.';
        } else if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(fields.expirationCountry.trim())) {
            errors['expiration-country'] = 'El país solo puede contener letras y espacios.';
        }

        if (!fields.expiryDate) {
            errors['expiration-date'] = 'La fecha de caducidad es obligatoria si se introduce un pasaporte.';
        } else if (new Date(fields.expiryDate) < new Date()) {
            errors['expiration-date'] = 'El pasaporte está caducado. La fecha debe ser futura.';
        }
    }

    // Si se rellena país o fecha pero no el número de pasaporte
    if (!fields.identification.trim()) {
        if (fields.expirationCountry.trim()) {
            errors['expiration-country'] = 'Introduce primero el número de pasaporte.';
        }
        if (fields.expiryDate) {
            errors['expiration-date'] = 'Introduce primero el número de pasaporte.';
        }
    }

    return errors;
}

const REQUIRED_FIELDS = ['name', 'surname', 'email', 'age', 'phone'];
const PASSPORT_FIELDS = ['id-number', 'expiration-country', 'expiration-date'];

function validateAndDisplay(fieldId) {
    const fields = getFields();
    const fieldEl = document.getElementById(fieldId);
    const fieldValue = fieldEl?.value ?? '';

    // Campos de pasaporte dependientes: solo si hay número de identificación
    if ((fieldId === 'expiration-country' || fieldId === 'expiration-date') && !fields.identification.trim()) {
        clearFieldState(fieldId);
        return;
    }

    if (!fieldValue.trim() && !fieldEl.classList.contains('input-error')) {
        clearFieldState(fieldId);
        return;
    }

    const errors = validateFields(fields);

    if (errors[fieldId]) {
        showError(fieldId, errors[fieldId]);
    } else {
        showSuccess(fieldId);
    }
}

['name', 'surname', 'email', 'age', 'phone', 'id-number', 'expiration-country', 'expiration-date']
    .forEach(fieldId => {
        const el = document.getElementById(fieldId);
        if (!el) return;

        el.addEventListener('blur', () => validateAndDisplay(fieldId));
        el.addEventListener('input', () => validateAndDisplay(fieldId));
    });

const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearAll();

    const fields = getFields();
    const errors = validateFields(fields);

    const allFieldIds = ['name', 'surname', 'email', 'age', 'phone'];
    if (fields.identification.trim() || fields.expirationCountry.trim() || fields.expiryDate) {
        allFieldIds.push('id-number', 'expiration-country', 'expiration-date');
    }

    allFieldIds.forEach(fieldId =>
        errors[fieldId] ? showError(fieldId, errors[fieldId]) : showSuccess(fieldId)
    );

    if (Object.keys(errors).length > 0) {
        document.querySelector('.input-error')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const nextId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;

    const user = {
        id: editId || nextId,
        name: fields.name,
        surname: fields.surname,
        email: fields.email,
        age: Number(fields.age),
        phone: fields.phone,
        identification: fields.identification,
        expirationCountry: fields.expirationCountry,
        expiryDate: fields.expiryDate
    };

    const existingIndex = users.findIndex(u => u.id === user.id);

    if (existingIndex !== -1) {
        users[existingIndex] = user;
    } else {
        users.push(user);
    }

    localStorage.setItem('users', JSON.stringify(users));

    alert('User added correctly!');
    window.location.href = 'listados.html';
});