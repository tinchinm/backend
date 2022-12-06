// IMPORTACIONES DE LOS MODULOS
import fs from "fs/promises"
import path from "path";

// DECLARACION DE RUTAS
const rutaMjes = path.resolve(__dirname, '../data/mensajes.json');

class ApiMjs {
    async getMsg(){
        const getData = await fs.readFile(rutaMjes, 'utf-8');
	    const mensajes = JSON.parse(getData);
        return mensajes
    }
    async addMsg(data:any){
        const getData = await fs.readFile(rutaMjes, 'utf-8');
	    const mensajes = JSON.parse(getData);
	    mensajes.push(data);
	    await fs.writeFile(rutaMjes, JSON.stringify(mensajes, null, '\t'));
    }

}

export const mensajesController = new ApiMjs();