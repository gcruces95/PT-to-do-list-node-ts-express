import express, { Router } from 'express';
import cors from 'cors';
import path from 'path';
import { createServer } from 'http';
import { Server as SocketServer } from 'socket.io';

interface Options {
    port: number;
    routes: (io: SocketServer) => Router;
    public_path: string;
}

export class Server {
    private app = express();
    private server = createServer(this.app);
    private io = new SocketServer(this.server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });
    
    private readonly port: number;
    private readonly public_path: string;
    private readonly routes: (io: SocketServer) => Router;

    constructor(options: Options) {
        const { port, routes, public_path } = options;
        this.port = port;
        this.public_path = public_path;
        this.routes = routes;
    }

    async start() {
        //* Cors
        this.app.use(cors());

        //* Middleware
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        //* Routes
        this.app.use('/api', this.routes(this.io));

        //* Public folder
        this.app.use(express.static(path.join(__dirname, '../../public')));

        //* Socket.IO connection handling
        this.io.on('connection', (socket) => {
            console.log(`Cliente conectado: ${socket.id}`);
            
            socket.on('disconnect', () => {
                console.log(`Cliente desconectado: ${socket.id}`);
            });

            // Evento para unirse a una sala (opcional para escalabilidad futura)
            socket.on('joinRoom', (room) => {
                socket.join(room);
                console.log(`Cliente ${socket.id} se unió a la sala: ${room}`);
            });
        });

        //* Serve index.html for all other routes (SPA support) - MUST BE LAST
        this.app.get(/^(?!\/socket\.io).*/, (req, res) => {
            const indexPath = path.join(__dirname, '../../', this.public_path, 'index.html');
            res.sendFile(indexPath);
        });

        this.server.listen(this.port, () => {
            console.log(`🚀 Servidor ejecutándose en puerto ${this.port}`);
            console.log(`📡 WebSocket server activo`);
            console.log(`📂 Archivos estáticos desde: ${this.public_path}`);
        });
    }
}