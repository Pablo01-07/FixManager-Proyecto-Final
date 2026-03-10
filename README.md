# FixManager 📱

FixManager es una aplicación móvil desarrollada con **React Native y Expo** para gestionar activos tecnológicos y reportar incidencias de mantenimiento.

La aplicación permite visualizar equipos, crear reportes de fallas con imágenes, cambiar el estado de reparación y consultar el historial de cambios de cada reporte.

---

## 🚀 Funcionalidades

- Visualización de **activos tecnológicos**
- Creación de **reportes de fallas**
- Adjuntar **imágenes a los reportes**
- Cambio de estado del reporte:
  - Pendiente
  - En proceso
  - Resuelto
- Historial de cambios del reporte
- Búsqueda de activos por nombre o marca
- Gestión de reportes por usuario

---

## 🧱 Tecnologías utilizadas

- React Native
- Expo
- Redux Toolkit
- RTK Query
- Firebase Realtime Database
- Firebase Authentication
- React Navigation
- Expo Image Picker

---

## ⚙️ Cómo funciona la aplicación

1. El usuario inicia sesión mediante **Firebase Authentication**.
2. Puede visualizar los **activos disponibles** dentro de la aplicación.
3. Desde un activo puede crear un **reporte de falla** agregando descripción e imagen.
4. Cada reporte tiene un **estado de seguimiento** (Pendiente, En proceso o Resuelto).
5. Los cambios de estado se registran en un **historial del reporte**.
6. Toda la información se guarda en **Firebase Realtime Database**.

---

## ⚙️ Instalación y ejecución

1. Clonar el repositorio
```git clone https://github.com/Pablo01-07/FixManager-Proyecto-Final.git```
2. Entrar al proyecto
```cd fixmanager```
3. Instalar dependencias
```npm install```
3. Instalar dependencias
```npx expo start```

Luego podrás ejecutar la aplicación en:

- 📱 Un dispositivo móvil usando **Expo Go**
- 🤖 Un emulador de Android

---

## 📊 Base de datos

La aplicación utiliza **Firebase Realtime Database** para almacenar:

- Activos
- Reportes
- Imágenes de reportes

Cada usuario solo puede visualizar y gestionar **sus propios reportes**.

---

## 👤 Autor

**Pablo Rojas**

Proyecto desarrollado para el curso de **Desarrollo de Aplicaciones con React Native en CoderHouse**.