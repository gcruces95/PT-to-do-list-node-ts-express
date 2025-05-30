# Nombre del Proyecto

Este proyecto es un template para inicializar de manera rápida un servidor Node.js con Express. Proporciona una estructura básica y configuraciones iniciales para empezar a desarrollar aplicaciones web con Node.js y Express de manera eficiente.

## Requisitos

-   Node.js
-   Docker (opcional, para usar `docker-compose`)

## Instalación

1. Clona el repositorio:

    ```sh
    git clone git@github.com:gcruces95/node-ts-express-template.git
    cd node-ts-express-template
    ```

2. Instala las dependencias:

    ```sh
    npm install
    ```

3. Configura las variables de entorno:
   Copia el archivo `.env.template` a `.env` y modifica los valores según sea necesario.

## Uso

### Desarrollo

Para iniciar el servidor en modo desarrollo:

```sh
npm run dev
```

### Producción

```sh
npm run build
npm start
```

### Docker

Para ejecutar el proyecto usando Docker:

**Primero debe considerar descomentar el código.**

```sh
docker-compose up --build
```

### Estructura del Código

-   `src/app.ts`: Punto de entrada principal de la aplicación.
-   `src/config/envs.ts`: Configuración de las variables de entorno.
-   `src/presentation/routes.ts`: Definición de las rutas de la API.
-   `src/presentation/server.ts`: Configuración y arranque del servidor.

### Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo [LICENCE](./LICENCE) para más detalles.
