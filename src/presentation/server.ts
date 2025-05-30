import express, { Router } from 'express';
import cors from 'cors';
import path from 'path';

interface Options {
    port: number;
    routes: Router;
    public_path: string;
}

export class Server {

    private app = express();
    private readonly port: number;
    private readonly public_path: string;
    private readonly routes: Router;

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
        this.app.use(this.routes);

        //* Public folder
        this.app.use(express.static(path.join(__dirname, '../../public')));

        this.app.get('*', (req, res) => {
            const indexPath = path.join(__dirname + `/../../${this.public_path}/index.html`);
            res.sendFile(indexPath);
            return;
        });

        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });

    }

}