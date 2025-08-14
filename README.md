
# 🌐 Frontend - TX-Portal (React)

----------

Frontend para un portal transaccional integral, desarrollado con React para gestionar recargas móviles, consumir servicios del backend y ofrecer una experiencia de usuario ágil y amigable.
Este proyecto está desarrollado con **[Next.js](https://nextjs.org/)** y **React**, utilizando el **App Router** y herramientas modernas para el desarrollo frontend.

----------

## 📋 Requisitos previos

Asegúrate de tener instalado en tu máquina:

- **Node.js** (versión recomendada: 18.x o superior)  
  [Descargar Node.js](https://nodejs.org/)

- **npm** (incluido con Node.js) o **yarn** / **pnpm**

- **Git** para clonar el repositorio  
  [Descargar Git](https://git-scm.com/)


----------
## 📦 Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/shirleytatianag/tx-portal-front.git
   ```

2. **Entrar en la carpeta del proyecto**
   ```bash
   cd tx-portal-front
   ```
3. **Instalar dependencias**
   ```bash
   npm install
   ```
   o si prefieres yarn:
    ```bash
    yarn install
    ```
----------

## 🌍 Configuración de variables de entorno

Este proyecto utiliza archivos `.env` para manejar las variables de entorno.

### Crear archivo de entorno
Renombra el archivo de ejemplo `.env.example` a `.env.local` o `.env.development` según tu preferencia.

Desarrollo local → .env.local o .env.development (usado con npm run dev)

Producción → .env.production (usado con npm run build && npm run start)

----------

## ▶️ Ejecutar en desarrollo
Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   ```

o con yarn:

  ```bash
   yarn dev
   ```
Luego abre http://localhost:3000 en tu navegador.

----------

## 🏗️ Construir para producción
Para crear una versión optimizada para producción, ejecuta:

```bash
npm run build
```
o si prefieres yarn:

```bash
yarn build
```
----------
## 🚀 Ejecutar en producción
Para iniciar el servidor en modo producción, primero asegúrate de haber construido el proyecto:

```bash
npm run build
```
o con yarn:

```bash
yarn build
```
Luego ejecuta:

```bash
npm start
```
o con yarn:

```bash
yarn start
```

----------

## 🌍 Deployment en Producción

Este proyecto está desplegado en **Vercel** y disponible públicamente en la siguiente URL:

🔗 **[https://tx-portal-front.vercel.app/login](https://tx-portal-front.vercel.app/login)**

Puedes acceder directamente para probar la aplicación en el entorno de producción.

----------

### 🔹 Crendenciales de inicio de sesión en la plataforma

Usuario: `admin`  
Contraseña: `12345`

----------

## 📬 Contacto

📧 **shirleytg339@gmail.com**  
💻 Proyecto desarrollado por **Shirley Garcia**

----------