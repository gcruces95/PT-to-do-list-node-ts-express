# 📝 API de Gestión de Tareas - Lista de Tareas en Tiempo Real

Una aplicación completa de gestión de tareas (To-Do List) construida con Node.js, Express, PostgreSQL y WebSockets que permite la actualización en tiempo real para todos los clientes conectados.

## 🚀 Características

- ✅ **API RESTful completa** con operaciones CRUD para tareas
- 🔄 **Actualizaciones en tiempo real** usando WebSockets (Socket.IO)
- 🗄️ **Base de datos PostgreSQL** con Prisma ORM
- 🎨 **Frontend responsive** con interfaz moderna incluida
- 🏗️ **Arquitectura limpia** con separación de capas (Domain, Data, Presentation)
- 📝 **Validaciones robustas** en DTOs
- 🔧 **TypeScript** para mayor seguridad de tipos
- 🐳 **Containerización** con Docker Compose
- 🔍 **UUIDs** para identificadores únicos de tareas

## 🌐 Demo en Vivo

🚀 **¡Prueba la aplicación ahora mismo!** 

Puedes acceder a una demo funcional de la aplicación en:

**➡️ [https://pt-to-do-list-node-ts-express-production.up.railway.app/](https://pt-to-do-list-node-ts-express-production.up.railway.app/)**

La demo incluye:
- ✅ Todas las funcionalidades de la aplicación
- 🔄 Actualizaciones en tiempo real con WebSockets
- 📱 Interfaz responsive que funciona en móviles y escritorio
- 🎯 API completa disponible en `/api/tasks`

*Nota: La demo está desplegada en Railway y puede tomar unos segundos en cargar si ha estado inactiva.*

## 📋 Requisitos Previos

- Node.js (versión 18 o superior)
- PostgreSQL (versión 13 o superior)
- npm
- Docker y Docker Compose (opcional, pero recomendado)

## 🛠️ Instalación y Configuración

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/PT-to-do-list-node-ts-express
cd PT-to-do-list-node-ts-express
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno

Copiar el archivo de configuración:
```bash
cp env.example .env
```

Editar el archivo `.env` con tus credenciales. Las variables disponibles son:
```env
# Database
DB_URL="postgresql://postgres:123456@localhost:5432/todolist"
DB_PASSWORD=123456
DB_NAME=todolist
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres

# Server
PORT=3000
PUBLIC_PATH=public
NODE_ENV=development
```

### 4. Configurar la base de datos

#### Opción A: Docker Compose (Recomendado)
El proyecto incluye un `docker-compose.yml` que utiliza PostgreSQL 17.5:
```bash
# Asegúrate de tener el archivo .env configurado antes de ejecutar
docker-compose up -d
```

#### Opción B: PostgreSQL local
1. Instalar PostgreSQL en tu sistema
2. Crear una base de datos llamada `todolist`
3. Configurar las credenciales en el archivo `.env`

### 5. Configurar Prisma y migrar la base de datos
```bash
# Generar el cliente de Prisma
npx prisma generate

# Crear la migración inicial (para nuevos proyectos)
npx prisma migrate dev --name init

# Alternativamente, sincronizar el esquema con la base de datos (para prototipado)
npx prisma db push

# (Opcional) Abrir Prisma Studio para visualizar la base de datos
npx prisma studio
```

## 🚀 Ejecución

### Modo desarrollo (con hot reload)
```bash
npm run dev
```

### Modo producción
```bash
npm run build
npm start
```

La aplicación estará disponible en:
- **Frontend**: http://localhost:3000
- **API**: http://localhost:3000/api
- **Prisma Studio**: http://localhost:5555 (si se ejecuta)

## 📡 API Endpoints

### Tareas

| Método | Endpoint | Descripción | Body |
|--------|----------|-------------|------|
| `GET` | `/api/tasks` | Obtener todas las tareas | - |
| `POST` | `/api/tasks` | Crear una nueva tarea | `{ "titulo": "string", "descripcion": "string?" }` |
| `PUT` | `/api/tasks/:id` | Actualizar estado de tarea | `{ "status": "pendiente\|en_progreso\|completada\|cancelada" }` |
| `DELETE` | `/api/tasks/:id` | Eliminar una tarea | - |

### Estructura de respuesta de tareas

```json
{
  "id": "uuid-string",
  "titulo": "string",
  "descripcion": "string | null",
  "status": "pendiente | en_progreso | completada | cancelada",
  "fechaCreacion": "2024-01-01T00:00:00.000Z",
  "fechaActualizacion": "2024-01-01T00:00:00.000Z"
}
```

### Ejemplos de uso

#### Crear una tarea
```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Completar proyecto",
    "descripcion": "Finalizar la API de tareas con WebSockets"
  }'
```

#### Obtener todas las tareas
```bash
curl http://localhost:3000/api/tasks
```

#### Actualizar estado de tarea
```bash
curl -X PUT http://localhost:3000/api/tasks/[ID_TAREA] \
  -H "Content-Type: application/json" \
  -d '{ "status": "completada" }'
```

#### Eliminar una tarea
```bash
curl -X DELETE http://localhost:3000/api/tasks/[ID_TAREA]
```

## 🔌 WebSockets

La aplicación utiliza Socket.IO para comunicación en tiempo real. Todas las operaciones CRUD se sincronizan automáticamente entre clientes conectados.

### Eventos del servidor hacia el cliente:
- `newTask`: Se emite cuando se crea una nueva tarea
- `taskUpdated`: Se emite cuando se actualiza el estado de una tarea  
- `taskDeleted`: Se emite cuando se elimina una tarea

### Ejemplo de conexión WebSocket:
```javascript
const socket = io('http://localhost:3000');

socket.on('connect', () => {
  console.log('Conectado al servidor WebSocket');
});

socket.on('newTask', (task) => {
  console.log('Nueva tarea creada:', task);
  // Agregar la tarea a la UI
});

socket.on('taskUpdated', (data) => {
  console.log('Tarea actualizada:', data);
  // Actualizar la tarea en la UI
});

socket.on('taskDeleted', (data) => {
  console.log('Tarea eliminada:', data);
  // Remover la tarea de la UI
});

socket.on('disconnect', () => {
  console.log('Desconectado del servidor WebSocket');
});
```

## 🧪 Pruebas de WebSockets

**⚠️ Importante**: Asegúrate de que el servidor esté ejecutándose antes de probar las conexiones WebSocket:
```bash
npm run dev
```

### Opción 1: Usar el frontend incluido
1. Abrir http://localhost:3000 en múltiples pestañas del navegador
2. Crear, actualizar o eliminar tareas en una pestaña
3. Observar las actualizaciones automáticas en las otras pestañas

### Opción 2: Usar herramientas de línea de comandos

#### Con wscat:
```bash
# Instalar wscat globalmente
npm install -g wscat
```

**Para PowerShell (Windows) - Usar comillas simples:**
```powershell
wscat -c 'ws://localhost:3000/socket.io/?EIO=4&transport=websocket'
```

**Para CMD (Windows):**
```cmd
wscat -c "ws://localhost:3000/socket.io/?EIO=4&transport=websocket"
```

**Para Bash/Zsh (Linux/macOS):**
```bash
wscat -c 'ws://localhost:3000/socket.io/?EIO=4&transport=websocket'
```

#### Con Postman o Insomnia:
1. Crear una nueva conexión WebSocket
2. URL: `ws://localhost:3000/socket.io/?EIO=4&transport=websocket`
3. Escuchar los eventos mencionados arriba

### 🔧 Solución de problemas

#### Error: "Failed to connect to localhost port 3000"
- **Causa**: El servidor no está ejecutándose
- **Solución**: Ejecutar `npm run dev` en otra terminal

#### Error en PowerShell: "transport=websocket is not recognized"
- **Causa**: PowerShell interpreta el `&` como operador de background job
- **Solución**: Usar comillas simples: `wscat -c 'ws://localhost:3000/socket.io/?EIO=4&transport=websocket'`

#### Error: "wscat: command not found"
- **Causa**: wscat no está instalado globalmente
- **Solución**: Ejecutar `npm install -g wscat`

#### Conexión exitosa pero sin eventos
- **Verificar**: Que el servidor esté en http://localhost:3000
- **Verificar**: Que la aplicación frontend esté funcionando
- **Probar**: Crear una tarea desde el frontend para ver eventos en wscat

## 🏗️ Arquitectura del Proyecto

```
PT-to-do-list-node-ts-express/
├── prisma/
│   └── schema.prisma     # Esquema de la base de datos
├── postgres/             # Archivos de configuración de PostgreSQL
├── public/
│   └── index.html        # Frontend incluido
├── src/
│   ├── app.ts           # Punto de entrada de la aplicación
│   ├── config/          # Configuración (DB, variables de entorno)
│   ├── data/            # Capa de datos (repositorios)
│   │   ├── postgres/    # Configuración de PostgreSQL
│   │   └── task.repository.ts
│   ├── domain/          # Lógica de negocio
│   │   ├── dtos/        # Data Transfer Objects
│   │   ├── entities/    # Entidades del dominio
│   │   └── use-cases/   # Casos de uso
│   └── presentation/    # Capa de presentación
│       ├── controllers/ # Controladores
│       ├── routes/      # Definición de rutas
│       └── server.ts    # Configuración del servidor
├── docker-compose.yml   # Configuración de Docker
├── env.example          # Variables de entorno de ejemplo
├── package.json         # Dependencias y scripts
└── tsconfig.json        # Configuración de TypeScript
```

## 🎯 Decisiones de Diseño

### 1. **Arquitectura Limpia**
- Separación clara entre capas de dominio, datos y presentación
- Inversión de dependencias usando interfaces abstractas
- Casos de uso independientes de frameworks externos

### 2. **Validaciones con DTOs**
- Validaciones centralizadas en Data Transfer Objects
- Mensajes de error descriptivos y consistentes
- Validación tanto en frontend como backend

### 3. **WebSockets con Socket.IO**
- Comunicación bidireccional en tiempo real
- Manejo automático de reconexiones
- Eventos específicos para cada operación CRUD
- Sincronización automática entre múltiples clientes

### 4. **Base de Datos con Prisma**
- ORM type-safe para TypeScript
- Migraciones automáticas con `prisma db push`
- Cliente generado automáticamente
- Esquema versionado y reproducible

### 5. **Identificadores UUID**
- Identificadores únicos universales para mayor seguridad
- Prevención de enumeración de recursos
- Compatibilidad con sistemas distribuidos

### 6. **Timestamps Automáticos**
- Fecha de creación automática (`fechaCreacion`)
- Fecha de actualización automática (`fechaActualizacion`)
- Control de auditoría integrado

## 🔧 Scripts Disponibles

```bash
npm run dev      # Ejecutar en modo desarrollo con hot reload (tsnd)
npm run build    # Compilar TypeScript a JavaScript y limpiar directorio dist
npm start        # Compilar y ejecutar en modo producción
```

### Scripts de Prisma
```bash
npx prisma generate              # Generar cliente de Prisma
npx prisma migrate dev --name init   # Crear migración inicial
npx prisma migrate dev           # Crear nueva migración en desarrollo
npx prisma db push               # Sincronizar esquema con la base de datos (prototipado)
npx prisma studio                # Abrir interfaz visual de la base de datos
npx prisma db pull               # Sincronizar esquema desde la base de datos
npx prisma migrate deploy        # Aplicar migraciones en producción
```

## 🌟 Características del Frontend

El frontend incluido (`public/index.html`) proporciona:

- **Interfaz responsive** que funciona en dispositivos móviles y desktop
- **Indicador de conexión** WebSocket en tiempo real
- **Validación de formularios** antes del envío
- **Estados de tarea personalizables** con colores distintivos
- **Actualizaciones en tiempo real** sin necesidad de recargar la página
- **Confirmación de eliminación** para prevenir borrados accidentales
- **Diseño moderno** con CSS personalizado y animaciones

## 🐳 Docker

El proyecto incluye `docker-compose.yml` para PostgreSQL 17.5:

```yaml
version: "3.8"

services:
    postgres-db:
        image: postgres:17.5
        restart: always
        ports:
            - "5432:5432"
        environment:
            POSTGRES_USER: ${DB_USERNAME}
            POSTGRES_DB: ${DB_NAME}
            POSTGRES_PASSWORD: ${DB_PASSWORD}
        container_name: todo-list-db
        volumes:
            - ./postgres:/var/lib/postgresql/data
```

### Comandos útiles:
```bash
# Levantar los servicios (PostgreSQL)
docker-compose up -d

# Ver logs de los servicios
docker-compose logs -f

# Detener los servicios
docker-compose down

# Detener y limpiar volúmenes
docker-compose down -v
```

## 🚀 Despliegue en Producción

### Variables de entorno para producción:
```env
DB_URL="postgresql://usuario:contraseña@host:puerto/base_de_datos"
DB_PASSWORD=tu_password_seguro
DB_NAME=todolist
DB_HOST=tu_host_de_produccion
DB_PORT=5432
DB_USERNAME=tu_usuario
PORT=3000
PUBLIC_PATH=public
NODE_ENV=production
```

### Pasos recomendados:
1. Usar una base de datos PostgreSQL en la nube (AWS RDS, Google Cloud SQL, etc.)
2. Configurar `NODE_ENV=production`
3. Usar un process manager como PM2:
   ```bash
   npm install -g pm2
   pm2 start dist/app.js --name "todo-app"
   ```
4. Configurar un proxy reverso (Nginx) para servir archivos estáticos
5. Configurar HTTPS con certificados SSL

## 🛠️ Tecnologías Utilizadas

### Backend
- **Node.js** - Runtime de JavaScript
- **Express.js** 5.1.0 - Framework web
- **TypeScript** 5.6.2 - Tipado estático
- **Socket.IO** 4.8.1 - WebSockets en tiempo real
- **Prisma** 6.8.2 - ORM para base de datos
- **PostgreSQL** 17.5 - Base de datos relacional
- **UUID** 11.0.2 - Generación de identificadores únicos
- **CORS** 2.8.5 - Control de acceso de origen cruzado
- **dotenv** 16.4.5 - Manejo de variables de entorno
- **env-var** 7.5.0 - Validación de variables de entorno

### Herramientas de Desarrollo
- **ts-node-dev** 2.0.0 - Hot reload en desarrollo
- **rimraf** 6.0.1 - Limpieza de directorios
- **TypeScript** con tipos para todas las dependencias

### Frontend  
- **HTML5** - Estructura
- **CSS3** - Estilos y animaciones
- **Vanilla JavaScript** - Lógica del cliente
- **Socket.IO Client** - Conexión WebSocket

### DevOps
- **Docker** - Containerización
- **Docker Compose** - Orquestación de contenedores

## 📝 Licencia

Este proyecto está bajo la **Licencia MIT**. Ver el archivo `LICENCE` para más detalles.

**Copyright (c) 2024 Gabriel Cruces**

---

**Desarrollado con ❤️ usando Node.js, Express, PostgreSQL, Socket.IO y TypeScript**
