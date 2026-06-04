# 🌿 Emerald Drift — Travel Agency Website

> *"Experience the World, the Emerald Way!"*

Proyecto frontend desarrollado para el módulo de **Lenguaje de Marcas (LM)** del CFGS de Administración de Sistemas Informáticos en Red (ASIR). Simula el sitio web de una agencia de viajes ficticia llamada **Emerald Drift**, con gestión de usuarios, destinos y reservas usando `localStorage`.

---

## 📁 Estructura del proyecto

```
Agencia2-Proyecto-LM/
├── index.html                  # Página principal / Landing page
├── pages/
│   ├── contacto.html           # Formulario de contacto
│   ├── crear_usuario.html      # Registro y edición de usuarios
│   ├── crear_destino.html      # Creación y edición de destinos
│   ├── detalles_destino.html   # Vista de detalle de un destino
│   ├── listados.html           # Listado de usuarios y destinos
│   └── reserva.html            # Formulario de reserva
├── assets/
│   ├── css/
│   │   ├── style.css           # Estilos de la landing page
│   │   ├── shared.css          # Estilos compartidos entre páginas
│   │   ├── contact.css         # Estilos del formulario de contacto
│   │   ├── details.css         # Estilos de detalles de destino
│   │   ├── lists.css           # Estilos de listados
│   │   └── responsive.css      # Media queries / diseño responsive
│   ├── js/
│   │   ├── create_user.js          # Lógica de creación/edición de usuarios
│   │   ├── create_destination.js   # Lógica de creación/edición de destinos
│   │   ├── add_user_destination_to_list.js  # Renderizado de listados
│   │   ├── details_destination.js  # Lógica de detalles de destino
│   │   └── reserva.js              # Lógica de reservas
│   └── img/
│       ├── emerald_drift_logo.svg
│       └── emerald_drift_logo_black_preview.svg
```

---

## ✨ Funcionalidades

- **Landing page** con contador dinámico de usuarios y destinos registrados.
- **Registro de usuarios** con validación de campos (nombre, apellidos, edad, email, teléfono, DNI/pasaporte).
- **Creación de destinos** con nombre, país, precio, descripción y si requiere pasaporte.
- **Listado de usuarios y destinos** almacenados, con opciones de edición y eliminación.
- **Vista de detalle** de cada destino.
- **Formulario de reserva** de destinos.
- **Formulario de contacto**.
- Datos persistidos en **`localStorage`** del navegador (sin backend).
- Datos de ejemplo precargados al iniciar la app por primera vez.

---

## 🚀 Cómo ejecutar

Al ser un proyecto de HTML/CSS/JS puro, **no requiere instalación ni servidor**.

1. Clona el repositorio:
   ```bash
   git clone https://github.com/BlueSocks-code/Agencia2-Proyecto-LM.git
   ```
2. Abre el archivo `index.html` en tu navegador.

> También puedes usar la extensión **Live Server** de VS Code para una mejor experiencia de desarrollo.

---

## 🛠️ Tecnologías utilizadas

| Tecnología | Uso |
|---|---|
| HTML5 | Estructura y semántica |
| CSS3 | Estilos, grid, flexbox |
| JavaScript (Vanilla) | Lógica de negocio, DOM, formularios |
| localStorage | Persistencia de datos en el navegador |
| Google Fonts | Tipografías (*Cormorant Garamond*, *Jost*) |
| Font Awesome 6 | Iconos de redes sociales |

---

## 📸 Páginas

| Ruta | Descripción |
|---|---|
| `/index.html` | Landing page principal |
| `/pages/crear_usuario.html` | Registro / edición de usuarios |
| `/pages/crear_destino.html` | Creación / edición de destinos |
| `/pages/listados.html` | Listado de usuarios y destinos |
| `/pages/detalles_destino.html` | Detalles de un destino |
| `/pages/reserva.html` | Reservar un destino |
| `/pages/contacto.html` | Formulario de contacto |

---

## 📄 Licencia

[Emerald Drift](./index.html) por [Kimberly Paredes](https://kimberly.es) está bajo licencia [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
