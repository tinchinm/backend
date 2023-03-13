import Server from './services/server.ts';
import { config } from "https://deno.land/x/dotenv@v3.2.2/mod.ts";

const port = config().PORT

Server.listen(port, () => {
    console.log(`Servidor DENO escuchando en el puerto ${port}`);
});
