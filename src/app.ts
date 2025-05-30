import { Server } from "./presentation/server";
import { envs } from "./config/envs";
import { AppRoutes } from "./presentation/routes";
import { connectDB } from "./data/postgres/database";

(async () => {
    main();
})();

async function main() {
    // Conectar a la base de datos
    await connectDB();

    const server = new Server(
        {
            port: envs.PORT || 3000,
            public_path: envs.PUBLIC_PATH,
            routes: AppRoutes.routes,
        }
    );

    server.start();
}